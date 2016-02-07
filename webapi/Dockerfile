# Base the container off of the official Microsoft ASP.NET container, version 1.0.0-rc1-update1
FROM microsoft/aspnet:1.0.0-rc1-update1

# Install SQLite 3 in the container
RUN apt-get update
RUN printf "deb http://ftp.us.debian.org/debian wheezy main\n" >> /etc/apt/sources.list
RUN apt-get -qq update && apt-get install -qqy sqlite3 libsqlite3-dev && rm -rf /var/lib/apt/lists/*

# Copy the website into the container
COPY . /app
WORKDIR /app

# Restore the website dependencies
RUN ["dnu", "restore"]

# Make port 5000 accessible on the container
EXPOSE 5000/tcp

# Run the webserver when the container is started
ENTRYPOINT ["dnx", "-p", "WebAPIApplication/project.json", "web"]
