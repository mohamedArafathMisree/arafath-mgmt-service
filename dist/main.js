"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./core/filters/http-exception.filter");
const app_logger_1 = require("./core/logger/app-logger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(new app_logger_1.AppLogger()));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MGMT Service API')
        .setDescription('MGMT Service APIs')
        .setVersion('1.0')
        .addServer('/api')
        .addTag('Role', 'Operation about the role')
        .addTag('User', 'Operation about the user')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    app.enableCors();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map