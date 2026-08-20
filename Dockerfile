# Step 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the csproj file and restore dependencies
COPY BetwayDiskiFantasy.Api/BetwayDiskiFantasy.Api.csproj BetwayDiskiFantasy.Api/
RUN dotnet restore "BetwayDiskiFantasy.Api/BetwayDiskiFantasy.Api.csproj"

# Copy everything else and publish the app
COPY . .
WORKDIR "/src/BetwayDiskiFantasy.Api"
RUN dotnet publish "BetwayDiskiFantasy.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Step 2: Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 8080 (Render's default)
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "BetwayDiskiFantasy.Api.dll"]