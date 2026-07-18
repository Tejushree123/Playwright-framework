export const productPageLocators ={

    settingIcon : "#react-burger-menu-btn",
    logoutLink : "#logout_sidebar_link",
    aboutLink : "#about_sidebar_link",
    tryItFreeButton : "button:has-text('Try it free')",
    bookDemoLink : 'a[href="/request-demo"]:has-text("Book a Demo")',
    productCard: ".inventory_item",
    productNames : ".inventory_item_name ",  //dynamic locators
    productDescription : ".inventory_item_desc",   //dynamic locators
    productPrices : ".inventory_item_price",   //dynamic locators
    addToCartButton : ".btn.btn_primary.btn_small.btn_inventory",   //remove spaces and add dots instead of it in locators
    filterDropdown : ".product_sort_container",
    filterNameAtoZ : "option[value='az']",  //css selector
    filterNameZtoA :"option[value='za']",
    filterPriceLowtoHigh : "option[value='lohi']",
    filterPriceHightoLow : "option[value='hilo']",
    cartLink : ".shopping_cart_link",




    

}