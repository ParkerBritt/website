FROM docker.io/python:3.11

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

CMD fastapi run /app/main.py --port 80 --proxy-headers
