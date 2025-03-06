import puppeteer from "puppeteer";
import * as dotenv from "dotenv";

dotenv.config();

async function openWebPage(speed = 200) {
    // Abre una página web de ejemplo en un navegador y la cierra.
    const browser = await puppeteer.launch({
        headless: false,    // false -> muestra el navegador, true -> no muestra el navegador (como en Selenium!)
        slowMo: speed,         // ralentiza la ejecución 'speed' ms para ver las acciones (similar al `time.sleep()` de Selenium)
    });

    // Abrimos una nueva página en el navegador (esto es como crear un nuevo `webdriver` en Selenium)
    const page = await browser.newPage();

    // Navegamos a la página de ejemplo (como `driver.get("https://example.com")` en Selenium)
    await page.goto("https://example.com");

    await browser.close(); // Cerramos el navegador (como `driver.quit()` en Selenium)
}

async function captureScreenshot(speed = 200, path = "example.png") {
    // Captura una captura de pantalla de la página de ejemplo y la guarda en el archivo "example.png"
    const browser = await puppeteer.launch({
        headless: false,    // false -> muestra el navegador, true -> no muestra el navegador (otra vez, como Selenium)
        slowMo: speed,         // ralentiza la ejecución (para ver que pasa)
    });

    // Abrimos una nueva página
    const page = await browser.newPage();

    // Navegamos a la página de ejemplo
    await page.goto("https://example.com");

    // Capturamos una captura de pantalla (esto es como `driver.save_screenshot("example.png")` en Selenium)
    await page.screenshot({ path: path }); // path -> ruta donde guardar la captura (donde se guardará la imagen)

    await browser.close(); // Cerramos el navegador
}

async function scrapeQuotes(speed = 200) {
    const browser = await puppeteer.launch({
        headless: false,    // false -> muestra el navegador, true -> no muestra el navegador
        slowMo: speed,         // ralentiza la ejecución para poder ver las acciones
    });

    // Abrimos una nueva página en el navegador
    const page = await browser.newPage();

    // Navegamos a la página de ejemplo
    await page.goto("http://quotes.toscrape.com");

    // Capturamos una captura de pantalla (para verificar)
    await page.screenshot({ path: "quotes.png" });

    // Extraemos los datos de la página (esto es como usar `driver.find_elements_by_css_selector()` en Selenium y luego iterar sobre los elementos)
    const quotes = await page.evaluate(() => {
        const quoteElements = document.querySelectorAll(".quote");  // Seleccionamos todos los elementos con la clase "quote" (como `driver.find_elements(By.CLASS_NAME, "quote")` en Selenium)
        const quotes = [];
        quoteElements.forEach((quoteElement) => {
            const quote = quoteElement.querySelector(".text").innerText;    // Seleccionamos el elemento con la clase "text" y extraemos el texto (como `element.get_attribute("innerText")` en Selenium)
            const author = quoteElement.querySelector(".author").innerText; // Seleccionamos el elemento con la clase "author" y extraemos el texto
            quotes.push({ quote, author });
        });
        return quotes;
    });

    console.log(quotes);

    await browser.close(); // Cerramos el navegador
}

async function emulateIphone12(speed = 200) {
    // Emula un dispositivo móvil (iPhone 12) y realiza una búsqueda en Google.

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: speed,
    });

    const page = await browser.newPage();

    // Emulamos un dispositivo móvil
    const iPhone12 = puppeteer.devices["iPhone 12"];
    await page.emulate(iPhone12);

    await page.goto("https://google.com");
    await page.type("input[name=q]", "puppeteer", { delay: 100 });
    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    await page.screenshot({ path: "iphone12.png" });

    await browser.close();
}

async function logInToBartuChat(speed = 200, prompt="") {
    // Inicia sesión en Bartu Chat y envía un mensaje al chatbot.
    const browser = await puppeteer.launch({
        headless: false,    // false -> muestra el navegador, true -> no muestra el navegador
        slowMo: speed,         // ralentiza la ejecución 'speed' ms para ver las acciones
    });

    // Abrimos una nueva página en el navegador
    const page = await browser.newPage();

    // Navegamos a la página de ejemplo
    try {
        await page.goto("https://bartu-chat.vercel.app/");    // Navegamos a la página de Bartu Chat (como `driver.get()` en Selenium)
        await page.waitForSelector("#identifier-field");    // Input de email (Esperamos a que el selector esté presente, similar a WebDriverWait en Selenium)
        console.log("Página cargada");

        //  Escribimos el email
        await page.type("#identifier-field", process.env.EMAIL, { delay: 50 });    // Escribimos el email con un delay de 1ms (como `element.send_keys()` en Selenium)

        //  Escribimos la contraseña
        await page.type("#password-field", process.env.PASSWORD, { delay: 50 });    // Escribimos la contraseña con un delay de 1ms


        await page.click(".cl-formButtonPrimary");    // Botón de siguiente (como `element.click()` en Selenium)
        await page.waitForNavigation({ waitUntil: "networkidle0" });    // Esperamos a que cargue la siguiente página (similar a WebDriverWait en Selenium, esperando a que cambie la URL)
        console.log("Logueado");

        // Esperamos a que el input esté presente y *visible*

        const inputSelector = "input[placeholder='How can we help you today?']";
        const buttonSelector = 'button[title="Send Message"]';

        try {
            await page.waitForSelector(inputSelector, { visible: true, timeout: 5000 }); // Aumentamos el tiempo de espera (timeout)
            console.log("Input field found and visible!");
        } catch (error) {
            console.error("Input field not found or not visible:", error);
            throw error; // Volvemos a lanzar el error para detener la ejecución
        }

        // Esperamos un poco más a que el input esté completamente listo
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Escribimos el prompt
        await page.type(inputSelector, prompt, { delay: 50 });
        console.log("Prompt typed");

         // Esperamos a que el botón esté presente y *visible*
         try {
            await page.waitForSelector(buttonSelector, { visible: true, timeout: 3000 }); // Aumentamos el tiempo de espera (timeout)
            console.log("Send button found and visible!");
            // Esperamos a que el botón esté habilitado
            await page.waitForFunction(
                (selector) => {
                    const element = document.querySelector(selector);
                    return element && !element.disabled;
                },
                { timeout: 8000 }, // Aumentamos el tiempo de espera (timeout), este puede tardar más por qué depende de mi casa
                buttonSelector
            );
        } catch (error) {
            console.error("Send button not found or not visible:", error);
            throw error; // Volvemos a lanzar el error para detener la ejecución
        }

        await page.click(buttonSelector);
        console.log("Send button clicked");

        // Esperamos a que responda el modelo y logueamos la respuesta.
        let text = "";
        const textElementSelector = ".bg-slate-700";

        try {
            await page.waitForFunction(
                (selector) => {
                    const element = document.querySelector(selector);
                    return element && element.textContent.length > 0;
                },
                { timeout: 30000 }, // Aumentamos el tiempo de espera significativamente
                textElementSelector
            );

            const textElement = await page.$(textElementSelector);
            text = await page.evaluate((element) => element.textContent, textElement);

            console.log("AI Response:", text);
        } catch (error) {
            console.error("Error waiting for AI response:", error);
        }

    } catch (error) {
        console.error("An error occurred during login/chat:", error);
    } finally {
        // Mantenemos el navegador abierto para depurar (debugging)
        //await browser.close();
        console.log("Script finished");
        page.close();
    }
}

// Abrir una página web
//openWebPage(200);

// Capturar una captura de pantalla
//captureScreenshot(200, "example.png");

// Extraer citas de una página web
//scrapeQuotes(200);

// Emular un dispositivo móvil
//emulateIphone12(200);

// Extraer respuesta Chatbot
const prompt = "If its midnight and raining in Madrid, can it be sunny in Barcelona?";
logInToBartuChat(50, prompt);