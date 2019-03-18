FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 49982
EXPOSE 44326
EXPOSE 5001
Expose 32773

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
RUN ls
COPY ["ChatBox.csproj", "ChatBox/"]
COPY ["Program.cs", "ChatBox/"]
COPY ["Startup.cs", "ChatBox/"]
COPY ["ChatHub.cs", "ChatBox/"]
RUN dotnet restore "ChatBox/ChatBox.csproj"
COPY . .
WORKDIR "/src/ChatBox"
RUN ls
RUN dotnet build "ChatBox.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "ChatBox.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
RUN ls
ENTRYPOINT ["dotnet", "ChatBox.dll"]