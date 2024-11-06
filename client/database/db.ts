import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage"

const db = openDatabase({
  name: 'Panier.db'
});

// Fonction pour créer la table du panier si elle n'existe pas
export const createTables = async (db: SQLiteDatabase) => {
    const userPreferencesQuery = `
      CREATE TABLE IF NOT EXISTS UserPreferences (
          id INTEGER DEFAULT 1,
          colorPreference TEXT,
          languagePreference TEXT,
          PRIMARY KEY(id)
      )
    `
    const contactsQuery = `
     CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        name TEXT,
        phoneNumber TEXT
     )
    `
    try {
      await db.executeSql(userPreferencesQuery)
      await db.executeSql(contactsQuery)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
  }

// Fonction pour charger les articles du panier depuis la base SQLite
export const loadPanierItems = async (setPanierItems: React.Dispatch<React.SetStateAction<any[]>>) => {
  (await db).transaction(tx => {
    tx.executeSql('SELECT * FROM Panier;', [], (_, { rows }) => {
      setPanierItems(rows.raw());
    });
  });
};

// Fonction pour ajouter ou mettre à jour un article dans le panier
export const updatePanierItem = async (id: string, name: string, quantity: number, price: number, reloadPanier: () => void) => {
  (await db).transaction(tx => {
    tx.executeSql(
      'INSERT OR REPLACE INTO Panier (id, name, quantity, price) VALUES (?, ?, ?, ?);',
      [id, name, quantity, price],
      () => reloadPanier(),
      (_, error) => console.error("Erreur lors de la mise à jour de l'article:", error)
    );
  });
};

// Fonction pour retirer un article du panier
export const removeFromPanier = async (id: string, reloadPanier: () => void) => {
  (await db).transaction(tx => {
    tx.executeSql('DELETE FROM Panier WHERE id = ?;', [id], () => reloadPanier());
  });
};
