import bcrypt from 'bcryptjs';
import { Role, User, Category, Product } from '../models/index.js';

const ROLES = {
    ADMIN: 'Admin',
    GERENTE: 'Gerente',
    VENDEDOR: 'Vendedor',
    ADMIN_STOCK: 'Administrador de Stock',
    ATENCION_CLIENTE: 'Atención al Cliente',
    CLIENTE: 'Cliente'
};

/**
 * Auto-seed the database if it's empty (no roles exist)
 * This runs automatically on server startup in production
 */
export async function autoSeedDatabase() {
    try {
        // Check if database is already seeded
        const existingRoles = await Role.count();
        if (existingRoles > 0) {
            console.log('✓ Base de datos ya poblada, omitiendo seed automático');
            return;
        }

        console.log('🌱 Base de datos vacía detectada. Iniciando auto-seed...\n');

        // 1. Create Roles
        console.log('📝 Creando roles...');
        const roles = await Promise.all([
            Role.create({ name: ROLES.ADMIN }),
            Role.create({ name: ROLES.GERENTE }),
            Role.create({ name: ROLES.VENDEDOR }),
            Role.create({ name: ROLES.ADMIN_STOCK }),
            Role.create({ name: ROLES.ATENCION_CLIENTE }),
            Role.create({ name: ROLES.CLIENTE })
        ]);

        const roleMap = {};
        roles.forEach((role) => {
            roleMap[role.name] = role.id;
        });
        console.log('✅ Roles creados');

        // 2. Create Users (2 per role)
        console.log('👥 Creando usuarios de prueba...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const testUsers = [
            // Admins (2)
            { email: 'admin@whitestar.cl', password_hash: hashedPassword, first_name: 'Admin', last_name: 'Principal', role_id: roleMap[ROLES.ADMIN] },
            { email: 'admin2@whitestar.cl', password_hash: hashedPassword, first_name: 'Admin', last_name: 'Secundario', role_id: roleMap[ROLES.ADMIN] },
            // Gerentes (2)
            { email: 'gerente@whitestar.cl', password_hash: hashedPassword, first_name: 'Carlos', last_name: 'Rodríguez', role_id: roleMap[ROLES.GERENTE] },
            { email: 'gerente2@whitestar.cl', password_hash: hashedPassword, first_name: 'Laura', last_name: 'Mendoza', role_id: roleMap[ROLES.GERENTE] },
            // Vendedores (2)
            { email: 'vendedor@whitestar.cl', password_hash: hashedPassword, first_name: 'María', last_name: 'González', role_id: roleMap[ROLES.VENDEDOR] },
            { email: 'vendedor2@whitestar.cl', password_hash: hashedPassword, first_name: 'Juan', last_name: 'Pérez', role_id: roleMap[ROLES.VENDEDOR] },
            // Administradores de Stock (2)
            { email: 'stock@whitestar.cl', password_hash: hashedPassword, first_name: 'Pedro', last_name: 'Martínez', role_id: roleMap[ROLES.ADMIN_STOCK] },
            { email: 'stock2@whitestar.cl', password_hash: hashedPassword, first_name: 'Rosa', last_name: 'Castillo', role_id: roleMap[ROLES.ADMIN_STOCK] },
            // Atención al Cliente (2)
            { email: 'atencion@whitestar.cl', password_hash: hashedPassword, first_name: 'Ana', last_name: 'López', role_id: roleMap[ROLES.ATENCION_CLIENTE] },
            { email: 'atencion2@whitestar.cl', password_hash: hashedPassword, first_name: 'Luis', last_name: 'Fernández', role_id: roleMap[ROLES.ATENCION_CLIENTE] },
            // Clientes (2)
            { email: 'cliente@gmail.com', password_hash: hashedPassword, first_name: 'Sofia', last_name: 'Torres', role_id: roleMap[ROLES.CLIENTE] },
            { email: 'cliente2@gmail.com', password_hash: hashedPassword, first_name: 'Diego', last_name: 'Ramírez', role_id: roleMap[ROLES.CLIENTE] }
        ];

        await User.bulkCreate(testUsers);
        console.log('✅ Usuarios creados (2 por cada rol)');

        // 3. Create Categories
        console.log('📦 Creando categorías...');
        const categoriesData = [
            { name: 'Fragancias Femeninas', description: 'Perfumes elegantes para mujer' },
            { name: 'Fragancias Masculinas', description: 'Perfumes sofisticados para hombre' },
            { name: 'Fragancias Unisex', description: 'Perfumes versátiles para todos' },
            { name: 'Ediciones Limitadas', description: 'Colecciones exclusivas y especiales' }
        ];
        const categories = await Category.bulkCreate(categoriesData);
        console.log('✅ Categorías creadas');

        // 4. Create 12 Products
        console.log('🧴 Creando productos...');
        const productsData = [
            // Fragancias Masculinas (4)
            { name: 'Bleu de Chanel', description: 'Fragancia fresca y sofisticada con notas amaderadas. Ideal para el hombre moderno.', price: 89990, stock: 25, low_stock_threshold: 5, category_id: categories[1].id, image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop' },
            { name: 'Dior Sauvage', description: 'Fragancia icónica con notas de pimienta y ambroxan. Potente y magnético.', price: 79990, stock: 30, low_stock_threshold: 5, category_id: categories[1].id, image_url: 'https://images.unsplash.com/photo-1588405748390-9fbc4d9d7ffa?w=500&h=500&fit=crop' },
            { name: 'Creed Aventus', description: 'Fragancia de lujo con notas de piña y abedul. El perfume del éxito.', price: 149990, stock: 15, low_stock_threshold: 3, category_id: categories[1].id, image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop' },
            { name: 'Versace Pour Homme', description: 'Fragancia mediterránea fresca con notas cítricas y ambar.', price: 59990, stock: 40, low_stock_threshold: 8, category_id: categories[1].id, image_url: 'https://images.unsplash.com/photo-1595425964272-fc617fa5e9be?w=500&h=500&fit=crop' },

            // Fragancias Femeninas (4)
            { name: 'Chanel No. 5', description: 'La fragancia más icónica del mundo. Elegancia atemporal.', price: 99990, stock: 20, low_stock_threshold: 4, category_id: categories[0].id, image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop' },
            { name: 'Miss Dior', description: 'Fragancia romántica y fresca con notas florales de rosa y peonía.', price: 84990, stock: 28, low_stock_threshold: 5, category_id: categories[0].id, image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop' },
            { name: 'La Vie Est Belle', description: 'Fragancia dulce y adictiva con iris y praline. Celebra la vida.', price: 74990, stock: 35, low_stock_threshold: 7, category_id: categories[0].id, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop' },
            { name: 'Coco Mademoiselle', description: 'Fragancia oriental fresca con patchouli y naranja. Moderna y sensual.', price: 94990, stock: 22, low_stock_threshold: 4, category_id: categories[0].id, image_url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=500&fit=crop' },

            // Fragancias Unisex (2)
            { name: 'Jo Malone Lime Basil', description: 'Fragancia fresca y cítrica con albahaca. Elegancia británica.', price: 64990, stock: 35, low_stock_threshold: 7, category_id: categories[2].id, image_url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&h=500&fit=crop' },
            { name: 'Tom Ford Black Orchid', description: 'Fragancia oscura y seductora con orquídea negra y especias.', price: 119990, stock: 12, low_stock_threshold: 2, category_id: categories[2].id, image_url: 'https://images.unsplash.com/photo-1606394131145-e1925b1d0f76?w=500&h=500&fit=crop' },

            // Ediciones Limitadas (2)
            { name: 'YSL Libre Intense', description: 'Edición limitada con lavanda y vainilla de Madagascar. Intensamente libre.', price: 109990, stock: 8, low_stock_threshold: 2, category_id: categories[3].id, image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=500&fit=crop' },
            { name: 'Armani Privé Rose', description: 'Colección exclusiva con rosa de Damasco. Lujo absoluto.', price: 189990, stock: 5, low_stock_threshold: 1, category_id: categories[3].id, image_url: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=500&h=500&fit=crop' }
        ];

        await Product.bulkCreate(productsData);
        console.log('✅ 12 Productos creados');

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🎉 ¡Auto-seed completado exitosamente!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('📧 Credenciales de prueba: [email]@whitestar.cl / password123');
        console.log('═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('❌ Error en auto-seed:', error.message);
        // Don't crash the server, just log the error
    }
}
