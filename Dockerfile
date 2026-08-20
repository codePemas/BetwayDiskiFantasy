FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY BetwayDiskiFantasy.Api/BetwayDiskiFantasy.Api.csproj BetwayDiskiFantasy.Api/
RUN dotnet restore "BetwayDiskiFantasy.Api/BetwayDiskiFantasy.Api.csproj"

COPY . .
WORKDIR "/src/BetwayDiskiFantasy.Api"
RUN dotnet publish "BetwayDiskiFantasy.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "BetwayDiskiFantasy.Api.dll"]