FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
# EXPOSE 8080

# copy API.csproj file and restore
COPY *.csproj ./
RUN dotnet restore

#copy everything and build
COPY . ./
RUN dotnet publish -c Release -o out

#build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]