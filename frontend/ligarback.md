Passo a Passo:

1. Preparar o Frontend React
   No VS Code, abra a pasta frontend que você baixou:

cd frontend 2. Configurar a URL do Backend
Abra o arquivo /frontend/.env e configure a URL do seu Spring Boot local:

REACT_APP_BACKEND_URL=http://localhost:8080
Observação: Se seu Spring Boot rodar em outra porta (ex: 8081), mude para http://localhost:8081

3. Instalar Dependências

# Se tiver yarn instalado (recomendado)

yarn install

# OU com npm

npm install 4. Rodar o Frontend

# Com yarn

yarn start

# OU com npm

npm start
O React vai abrir em http://localhost:3000

⚙️ Configurar o Backend Spring Boot

1. Adicionar CORS no Spring Boot
   Crie uma classe de configuração para permitir requisições do React:

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }

} 2. Configurar application.properties
server.port=8080
spring.application.name=nexari-api

# Configurações do MongoDB (se usar)

spring.data.mongodb.uri=mongodb://localhost:27017/nexari_db 3. Garantir que as rotas comecem com /api
Todas as suas rotas no Spring Boot devem começar com /api:

@RestController
@RequestMapping("/api")
public class BaseController {
// suas rotas aqui
}

// Exemplo:
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        // retorna produtos
    }

}
