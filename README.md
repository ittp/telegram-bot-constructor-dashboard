## BotConstructor Dashboard

### Использованые ресурсы

Шаблон ASP Core MVC

[MongoCsharpDriver](https://github.com/mongodb/mongo-csharp-driver) (клиент Mongo)

[Mongo2Go](https://github.com/Mongo2Go/Mongo2Go) (заглушка Mongo для тестов)

### Информация

Токен от Mongo задается в **appsettings.config**

Маппинг монговских моделей в классы:

```csharp
// Игнорировать поля монговского документа, не указанные в классе (например поле __v и прочий мусор)
[BsonIgnoreExtraElements]
 public class Person
{
    // Название поля
    [BsonElement("_id")]
    public ObjectId Id { get; set; }
    [BsonElement("name")]
    public string Name { get; set; }
}

// Типизированная коллекция
var collection = database.GetCollection<Person>("persons");

// Можно передавать прямо классы
collection.InsertOne(new Person { Name = "Jack" });

// Обычные лямбды
var person = collection.Find(x => x.Name == "Jack").toList();
```

### Тесты

* Интеграционный тест для проверки доступа в Mongo
* Модульные тесты для контроллеров с заглушкой MongoDB
