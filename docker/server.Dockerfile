FROM python:3.10.7-slim-buster

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY pyproject.toml poetry.lock ./

RUN apt-get update -y && \
    apt-get install libpq-dev gcc -y

RUN pip install poetry

# force global installation
RUN poetry config virtualenvs.create false --local

RUN poetry install --only main

COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--reload", "--port", "8000"]