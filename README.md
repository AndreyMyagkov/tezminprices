# Минимальные цены по туроператору Тез Тур

Приложение выводит 3 отеля звездности 3, 4, 5 * с минимальной ценой из поисковой выдачи Тез Тур

![demo](https://raw.githubusercontent.com/AndreyMyagkov/tezminprices/master/public/tezminprices/i/demo.png)


### Конфигурация
`tezMinPriceConfig = {
    locale: "ru",
    city: 3746,
    country: 7067673
}
`

`locale` - язык (ru| ee)

`city` - id города вылета по справочнику Tez Tour

`country` - id страны  назначения по справочнику Tez Tour

### Сборка

`nmp run serve`- dev сборка

`npm run build` - prod сборка


### Стек
Vue, VueX, Vue-i18n,
API Tez Tour https://www.tez-tour.com/article.html?id=7015574