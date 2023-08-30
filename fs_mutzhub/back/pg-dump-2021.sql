--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- --SELECT pg_catalog.set_config('search_path', ',', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner:
--

--CREATE SCHEMA public;


--ALTER SCHEMA public OWNER TO mutz_hub_user;

-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.categories (
    cat_id bigint NOT NULL,
    cat_description character varying(10) NOT NULL
);


----ALTER TABLE public.categories OWNER TO mutz_hub_user;

--
-- Name: categories_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.categories_cat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE IF NOT EXISTS public.categories_cat_id_seq OWNER TO mutz_hub_user;

--
-- Name: categories_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

----ALTER SEQUENCE public.categories_cat_id_seq OWNED BY public.categories.cat_id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.clients(
    cli_id bigint NOT NULL,
    cli_name character varying(50) NOT NULL,
    cli_address character varying(100) NOT NULL,
    cli_telephone character varying(30) NOT NULL,
    cli_email character varying(80) NOT NULL,
    cli_password character varying(255) NOT NULL,
    cli_api_token character varying(255) NOT NULL
);


----ALTER TABLE public.clients OWNER TO mutz_hub_user;

--
-- Name: clients_cli_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.clients_cli_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.clients_cli_id_seq OWNER TO mutz_hub_user;

--
-- Name: clients_cli_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.clients_cli_id_seq OWNED BY public.clients.cli_id;


--
-- Name: currencies; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.currencies (
    curr_id bigint NOT NULL,
    curr_name character varying(3) NOT NULL
);


----ALTER TABLE public.currencies OWNER TO mutz_hub_user;

--
-- Name: currencies_curr_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.currencies_curr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.currencies_curr_id_seq OWNER TO mutz_hub_user;

--
-- Name: currencies_curr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.currencies_curr_id_seq OWNED BY public.currencies.curr_id;


--
-- Name: extra_ingredients; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.extra_ingredients (
    ext_id bigint NOT NULL,
    ext_name character varying(50) NOT NULL,
    ext_description character varying(100) NOT NULL,
    ext_price double precision NOT NULL,
    ext_shop bigint NOT NULL,
    ext_category_id bigint NOT NULL
);


----ALTER TABLE public.extra_ingredients OWNER TO mutz_hub_user;

--
-- Name: extra_ingredients_ext_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.extra_ingredients_ext_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.extra_ingredients_ext_id_seq OWNER TO mutz_hub_user;

--
-- Name: extra_ingredients_ext_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.extra_ingredients_ext_id_seq OWNED BY public.extra_ingredients.ext_id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.menu (
    men_id bigint NOT NULL,
    men_name character varying(50) NOT NULL,
    men_shop bigint NOT NULL,
    men_description character varying(100) NOT NULL,
    men_picture character varying(250) NOT NULL,
    men_category bigint NOT NULL,
    men_base_price double precision NOT NULL
);


----ALTER TABLE public.menu OWNER TO mutz_hub_user;

--
-- Name: menu_men_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.menu_men_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.menu_men_id_seq OWNER TO mutz_hub_user;

--
-- Name: menu_men_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.menu_men_id_seq OWNED BY public.menu.men_id;


--
-- Name: menu_variation; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.menu_variation (
    mv_menu_id bigint NOT NULL,
    mv_variation_id bigint NOT NULL
);


----ALTER TABLE public.menu_variation OWNER TO mutz_hub_user;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.migrations (
    id bigint NOT NULL,
    migration character varying(255) NOT NULL,
    batch bigint NOT NULL
);


----ALTER TABLE public.migrations OWNER TO mutz_hub_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.migrations_id_seq OWNER TO mutz_hub_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: order_status; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.order_status (
    sta_id bigint NOT NULL,
    sta_name character varying(20) NOT NULL
);


----ALTER TABLE public.order_status OWNER TO mutz_hub_user;

--
-- Name: order_status_sta_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.order_status_sta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.order_status_sta_id_seq OWNER TO mutz_hub_user;

--
-- Name: order_status_sta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.order_status_sta_id_seq OWNED BY public.order_status.sta_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.orders (
    ord_id bigint NOT NULL,
    ord_shop bigint NOT NULL,
    ord_date timestamp with time zone NOT NULL,
    ord_cli_address character varying(100) NOT NULL,
    ord_cli_telephone character varying(30) NOT NULL,
    ord_cli_name character varying(50) NOT NULL,
    ord_cli_email character varying(80) NOT NULL,
    ord_cli_id bigint,
    ord_observations character varying(250),
    ord_currency bigint NOT NULL,
    ord_shop_currency bigint NOT NULL,
    ord_shipping double precision NOT NULL,
    ord_conversion double precision NOT NULL,
    ord_total double precision NOT NULL,
    ord_status bigint DEFAULT 1::bigint NOT NULL
);


----ALTER TABLE public.orders OWNER TO mutz_hub_user;

--
-- Name: orders_menu; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.orders_menu (
    om_id bigint NOT NULL,
    om_order_id bigint NOT NULL,
    om_menu_id bigint NOT NULL,
    om_quantity bigint NOT NULL,
    om_price double precision NOT NULL
);


----ALTER TABLE public.orders_menu OWNER TO mutz_hub_user;

--
-- Name: orders_menu_extra; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.orders_menu_extra (
    ome_order_menu_id bigint NOT NULL,
    ome_extra_id bigint NOT NULL
);


----ALTER TABLE public.orders_menu_extra OWNER TO mutz_hub_user;

--
-- Name: orders_menu_om_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.orders_menu_om_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.orders_menu_om_id_seq OWNER TO mutz_hub_user;

--
-- Name: orders_menu_om_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.orders_menu_om_id_seq OWNED BY public.orders_menu.om_id;


--
-- Name: orders_menu_variation; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.orders_menu_variation (
    omv_order_menu_id bigint NOT NULL,
    omv_variation_id bigint NOT NULL
);


----ALTER TABLE public.orders_menu_variation OWNER TO mutz_hub_user;

--
-- Name: orders_ord_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.orders_ord_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.orders_ord_id_seq OWNER TO mutz_hub_user;

--
-- Name: orders_ord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.orders_ord_id_seq OWNED BY public.orders.ord_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.roles (
    rol_id bigint NOT NULL,
    rol_description character varying(20) NOT NULL
);


----ALTER TABLE public.roles OWNER TO mutz_hub_user;

--
-- Name: roles_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.roles_rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.roles_rol_id_seq OWNER TO mutz_hub_user;

--
-- Name: roles_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.roles_rol_id_seq OWNED BY public.roles.rol_id;


--
-- Name: shops; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.shops (
    sho_id bigint NOT NULL,
    sho_email character varying(100) NOT NULL,
    sho_name character varying(50) NOT NULL,
    sho_address character varying(100) NOT NULL,
    sho_pic character varying(100) NOT NULL,
    sho_role_id bigint NOT NULL,
    sho_telephone character varying(30) NOT NULL,
    sho_base_currency bigint NOT NULL,
    sho_password character varying(255) NOT NULL,
    sho_description character varying(150) NOT NULL,
    sho_shipping double precision NOT NULL,
    sho_api_token character varying(255) NOT NULL
);


----ALTER TABLE public.shops OWNER TO mutz_hub_user;

--
-- Name: shops_categories; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.shops_categories (
    sc_shop_id bigint NOT NULL,
    sc_category_id bigint NOT NULL,
    sc_category_picture character varying(100) NOT NULL
);


----ALTER TABLE public.shops_categories OWNER TO mutz_hub_user;

--
-- Name: shops_sho_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.shops_sho_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.shops_sho_id_seq OWNER TO mutz_hub_user;

--
-- Name: shops_sho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.shops_sho_id_seq OWNED BY public.shops.sho_id;


--
-- Name: variations; Type: TABLE; Schema: public; Owner: mutz_hub_user
--

CREATE TABLE IF NOT EXISTS public.variations (
    var_id bigint NOT NULL,
    var_name character varying(20) NOT NULL,
    var_description character varying(100) NOT NULL,
    var_type character varying(20) NOT NULL,
    var_shop_id bigint NOT NULL,
    var_price double precision NOT NULL
);


----ALTER TABLE public.variations OWNER TO mutz_hub_user;

--
-- Name: variations_var_id_seq; Type: SEQUENCE; Schema: public; Owner: mutz_hub_user
--

CREATE SEQUENCE IF NOT EXISTS public.variations_var_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


----ALTER TABLE public.variations_var_id_seq OWNER TO mutz_hub_user;

--
-- Name: variations_var_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mutz_hub_user
--

--ALTER SEQUENCE public.variations_var_id_seq OWNED BY public.variations.var_id;


--
-- Name: categories cat_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.categories --ALTER COLUMN cat_id SET DEFAULT nextval('public.categories_cat_id_seq'::regclass);


--
-- Name: clients cli_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.clients --ALTER COLUMN cli_id SET DEFAULT nextval('public.clients_cli_id_seq'::regclass);


--
-- Name: currencies curr_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.currencies --ALTER COLUMN curr_id SET DEFAULT nextval('public.currencies_curr_id_seq'::regclass);


--
-- Name: extra_ingredients ext_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.extra_ingredients --ALTER COLUMN ext_id SET DEFAULT nextval('public.extra_ingredients_ext_id_seq'::regclass);


--
-- Name: menu men_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu --ALTER COLUMN men_id SET DEFAULT nextval('public.menu_men_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.migrations --ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: order_status sta_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.order_status --ALTER COLUMN sta_id SET DEFAULT nextval('public.order_status_sta_id_seq'::regclass);


--
-- Name: orders ord_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders --ALTER COLUMN ord_id SET DEFAULT nextval('public.orders_ord_id_seq'::regclass);


--
-- Name: orders_menu om_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu --ALTER COLUMN om_id SET DEFAULT nextval('public.orders_menu_om_id_seq'::regclass);


--
-- Name: roles rol_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.roles --ALTER COLUMN rol_id SET DEFAULT nextval('public.roles_rol_id_seq'::regclass);


--
-- Name: shops sho_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops --ALTER COLUMN sho_id SET DEFAULT nextval('public.shops_sho_id_seq'::regclass);


--
-- Name: variations var_id; Type: DEFAULT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.variations --ALTER COLUMN var_id SET DEFAULT nextval('public.variations_var_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.categories (cat_id, cat_description) values
(1,'Pizzas'),
(2,'Drinks'),
(3,'Desserts');

--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.clients (cli_id,cli_name, cli_address, cli_telephone, cli_email, cli_password, cli_api_token) VALUES
(3,'Stan Podollack','Agency for the Performing Arts 405 S Beverly Drive Beverly Hills, CA','90212-4425','test1@stan.com','$2y$10$sVMm/vSVIlD8tojQh/pPi.q8Ajf23vPrNkjM0vMc/nSfc8SAJABai','w4ILvsNBmD6QBwLMUyMW1M3s0foi3tpWoIsJUUqjjhH7TGj8sWjtPiXSgkTrOGR0YBnjlTI9oKvK0SEit8LkbGKMYwTccXkd7vUwS7DlVwkQCUkGqzOU1JMxKixo786pnGsKWEjqvG9SAr1rm11I40ES5B1LnwafKFWsTMPOQ8DCKCw57aYL6dD6YG8JgyPgPDVSTwKipOEd6VbJHd8I6RPP86DIVtmyHjViEk3xWdJQBNiYgZaQbsoGoOaKpMP'),
(4,'Arnold Schwarzenegger','3110 Main St Ste 300 Santa Monica, CA,','90405-5354.','test2@arnold.com','$2y$10$ILHOO3R8kD6iWoE4NFxUguwtZ7gRjUD2Ua1fkwjWbdoBJYgNNmJu6','x20lmJp0QEaaHcAmK2PJwtPLwyFxfDAD3iMyMM7yp8uOJo7G0kII0elPcrutDFRAMaKpN5JqaMyhg8qk5r4IEPXACfQrkdv5cqwTEo1WKHvkwkraMwGDd8DUEwIViGbtlPOMUxgURhxNXTBJTKVyel0YzHUjzaDnDIsi9tU09NmoarJgvw3wSfMc3FDb36dUSKS1LdJiwTLLur12AjMC1JPy8DGWt6cDZRt3s2O2AqI2hwps5l16CUWN9zOGruQ'),
(5,'Keanu Reeves','9601 Wilshire Blvd Beverly Hills, CA','12313','test3@keanu.com','$2y$10$44PqFSwXvJLdgUPwKFd8XeWLDEaROhvjYqXEVm/ewbw.PleyCS9ci','uN6ZBH5bGV8EOHwbSJ658dejQqCjsuCGjUD29iastLd7cTevFs4TnvuzSzE3QpGiqjZl63zj4f9ddXBzyX65i7zaFbvgYxiwjQML3HShZO2N1hfpTD9iPOnt2vmDTkF1A3i6pBHR4ofNV7yuVqxNWQmvHkWMhtDcT9O2drGAsW4E9uueWU21cnCVUdMt95CV6FZdH806U1xkTB6T9e185LZgot0e3wKxkf9FKP378M1wtovnlhMDWnOGYgWjwBF'),
(6,'asdasd','aksjd','232133','test@test.com','$2y$10$W.IhURNh6yLxCQgjGqHXEOyP3QX3qDGfI48L4.AHSV/sObfvYSfcO','n8x4MSeL1C2OSs1GkDwPAwc1SkwU2Ig4cG0dcprYDsAoMTJJiAd6OCEPkAmmtX8Po2LS2HVuNgaGek9AnlYHDv18epwyTN7PzrC5QOswc00pc3a6i6WkTQroU2ioWmyETmVY0FAKl87T6ei41mI791ymBE3VXUJMFlOlcpaBzKnQrRf2It2j8DH0VxR2H53c0cnkoExHmaxZdlxIOJyKt44DwziL729zA8FiVBvofE8MH6nJHggw2r8u3FlOfGU');


--
-- Data for Name: currencies; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO  public.currencies (curr_id, curr_name) VALUES
(1,'USD'),
(2,'EUR');

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--


INSERT INTO public.roles (rol_id, rol_description) VALUES
(1,'Shop'),
(2,'Customer');


--
-- Data for Name: shops; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.shops (sho_id, sho_email, sho_name, sho_address, sho_pic, sho_role_id, sho_telephone, sho_base_currency, sho_password, sho_description, sho_shipping, sho_api_token) VALUES
(1,'pizzapalace@shop.com','Pizza Palace','pizza palace address','/img/1/shop_pic.png',1,'1234-5678',1,'password','This pizza is some serious pizza. We dont take it lightly.',10,'sad'),
(2,'pizzaspot@shop.com','Pizza Spot','pizza palace address','/img/2/shop_pic.png',1,'1234-5678',1,'password','You have never had a pizza like this before. trust me.',8,'sad'),
(3,'pizzaking@shop.com','Pizza King','pizza palace address','/img/3/shop_pic.png',1,'1234-5678',2,'password','Pizza made by the lord himself. Hail.',5,'sad');


--
-- Data for Name: shops_categories; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.shops_categories (sc_shop_id, sc_category_id, sc_category_picture) VALUES
(1,1,'/img/1/category/pizzas-cat.png'),
(1,2,'/img/1/category/drinks-cat.png'),
(1,3,'/img/1/category/desserts-cat.png'),
(2,1,'/img/2/category/pizzas-cat.png'),
(2,2,'/img/2/category/drinks-cat.png'),
(2,3,'/img/2/category/desserts-cat.png'),
(3,1,'/img/3/category/pizzas-cat.png'),
(3,2,'/img/3/category/drinks-cat.png'),
(3,3,'/img/3/category/desserts-cat.png');

--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.menu (men_id, men_name, men_shop, men_description, men_picture, men_category, men_base_price) VALUES
(1,'Margarita pizza',1,'Mozzarella cheese, tomato sauce.','/img/1/pizzas/margarita.png',1,9.86),
(2,'Chicken pizza',1,'Sliced chicken, peppers, jalapeño, mozzarella cheese, tomato sauce.','/img/1/pizzas/chicken.png',1,8.83),
(3,'Sausage pizza',1,'Sausage, onions, mushrooms, mozzarella cheese, tomato sauce.','/img/1/pizzas/sausage.png',1,10.16),
(4,'Pepperoni pizza',1,'Pepperoni, mozzarella cheese, tomato sauce.','/img/1/pizzas/pepperoni.png',1,11.13),
(5,'Peppers pizza',1,'Peppers, olives, raw tomatoes, mushrooms, muzzarella cheese, tomato sauce.','/img/1/pizzas/peppers.png',1,11.95),
(6,'Hawaiian pizza',1,'Pinapple, sliced ham, mozzarrella cheese, tomato sauce.','/img/1/pizzas/hawaian.png',1,13.15),
(7,'Bacon pizza',1,'Bacon, pepperoni, mozzarella cheese, tomato sauce.','/img/1/pizzas/bacon.png',1,12.3),
(9,'Chicken pizza',2,'Sliced chicken, peppers, jalapeño, mozzarella cheese, tomato sauce.','/img/2/pizzas/chicken.png',1,11.86),
(10,'Sausage pizza',2,'Sausage, onions, mushrooms, mozzarella cheese, tomato sauce.','/img/2/pizzas/sausage.png',1,10.7),
(11,'Pepperoni pizza',2,'Pepperoni, mozzarella cheese, tomato sauce.','/img/2/pizzas/pepperoni.png',1,9.08),
(12,'Peppers pizza',2,'Peppers, olives, raw tomatoes, mushrooms, muzzarella cheese, tomato sauce.','/img/2/pizzas/peppers.png',1,8.93),
(13,'Four Cheese pizza',2,'Mozzarella cheese, Roquefort cheese, Blue cheese, Brie cheese, tomato sauce.','/img/2/pizzas/4-cheese.png',1,13.02),
(14,'Seafood pizza',2,'Shrimp, onions, peppers, lobster, mozzarella cheese, tomato sauce.','/img/2/pizzas/seafood.png',1,11.89),
(15,'Veggie pizza',2,'Cherry tomatoes, peppers, black olives, corn, mozzarella cheese, tomato sauce.','/img/2/pizzas/veggie.png',1,11.58),
(16,'Bacon pizza',2,'Bacon, pepperoni, mozzarella cheese, tomato sauce.','/img/2/pizzas/bacon.png',1,9.05),
(17,'Hawaiian pizza',2,'Pinapple, sliced ham, mozzarrella cheese, tomato sauce.','/img/2/pizzas/hawaiian.png',1,10.51),
(18,'Pepperoni pizza',3,'Pepperoni, mozzarella cheese, tomato sauce.','/img/3/pizzas/pepperoni.png',1,12.21),
(19,'Peppers pizza',3,'Peppers, olives, raw tomatoes, mushrooms, muzzarella cheese, tomato sauce.','/img/3/pizzas/peppers.png',1,11.9),
(20,'Four Cheese pizza',3,'Mozzarella cheese, Roquefort cheese, Blue cheese, Brie cheese, tomato sauce.','/img/3/pizzas/4-cheese.png',1,9.66),
(21,'Seafood pizza',3,'Shrimp, onions, peppers, lobster, mozzarella cheese, tomato sauce.','/img/3/pizzas/seafood.png',1,12.59),
(22,'Veggie pizza',3,'Cherry tomatoes, peppers, black olives, corn, mozzarella cheese, tomato sauce.','/img/3/pizzas/veggie.png',1,12.01),
(23,'Bacon pizza',3,'Bacon, pepperoni, mozzarella cheese, tomato sauce.','/img/3/pizzas/bacon.png',1,9.04),
(24,'Cheesecake',1,'Basic cheesecake.','/img/1/desserts/dessert.png',3,3.25),
(25,'Red Velvet',1,'Basic Red Velvet cake.','/img/1/desserts/dessert.png',3,5.22),
(26,'Banana split',1,'Strawberry, chocolate and vanilla ice cream between two banana slices. Chocolate topping.','/img/1/desserts/dessert.png',3,2.05),
(27,'Chocolate volcano',1,'Chocolate explosion right in your face.','/img/1/desserts/dessert.png',3,2.27),
(28,'Super chocolate cake',1,'Three powerful and deliciously made chocolate layers.','/img/1/desserts/dessert.png',3,4.11),
(29,'Lemon pie',2,'Lemon pie','/img/2/desserts/dessert.png',3,3.82),
(30,'Banana split',2,'Strawberry, chocolate and vanilla ice cream between two banana slices. Chocolate topping.','/img/2/desserts/dessert.png',3,1.28),
(31,'Chocolate volcano',2,'Chocolate explosion right in your face.','/img/2/desserts/dessert.png',3,2.63),
(32,'Cookies & creeme cheesecake',2,'Cheesecake with oreos inside.','/img/2/desserts/dessert.png',3,3.81),
(33,'Pretzels',2,'3 Pretzels and mustard dip.','/img/2/desserts/dessert.png',3,1.27),
(34,'Cookies & creeme cheesecake',3,'Cheesecake with oreos inside.','/img/3/desserts/dessert.png',3,2.62),
(35,'Pretzels',3,'3 Pretzels and mustard dip.','/img/3/desserts/dessert.png',3,3.8),
(36,'Churros',3,'5 churros with chocolate topping.','/img/3/desserts/dessert.png',3,1.22),
(37,'Red Velvet',3,'Basic Red Velvet cake.','/img/3/desserts/dessert.png',3,2.4),
(38,'Super chocolate cake',3,'Three powerful and deliciously made chocolate layers.','/img/3/desserts/dessert.png',3,2.85),
(39,'Coca-cola',1,'500ml coca-cola soda','/img/1/drinks/drinks.png',2,1.32),
(40,'7-up',1,'500ml 7-up soda','/img/1/drinks/drinks.png',2,1.78),
(41,'Fanta',1,'500ml orange soda','/img/1/drinks/drinks.png',2,1.65),
(42,'Frescolita',1,'500ml frescolita soda','/img/1/drinks/drinks.png',2,1.78),
(43,'Dr Pepper',1,'500ml Dr. Pepper soda','/img/1/drinks/drinks.png',2,2.88),
(44,'Coca-cola',2,'500ml coca-cola soda','/img/2/drinks/drinks.png',2,1.36),
(45,'7-up',2,'500ml 7-up soda','/img/2/drinks/drinks.png',2,1.47),
(46,'Fanta',2,'500ml orange soda','/img/2/drinks/drinks.png',2,2.14),
(47,'Frescolita',2,'500ml frescolita soda','/img/2/drinks/drinks.png',2,3),
(48,'Dr Pepper',2,'500ml Dr. Pepper soda','/img/2/drinks/drinks.png',2,3.06),
(49,'Coca-cola',3,'500ml coca-cola soda','/img/3/drinks/drinks.png',2,3.04),
(50,'7-up',3,'500ml 7-up soda','/img/3/drinks/drinks.png',2,2.69),
(51,'Fanta',3,'500ml orange soda','/img/3/drinks/drinks.png',2,3.22),
(52,'Frescolita',3,'500ml frescolita soda','/img/3/drinks/drinks.png',2,2.55),
(53,'Dr Pepper',3,'500ml Dr. Pepper soda','/img/3/drinks/drinks.png',2,2);

--
-- Data for Name: variations; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.variations (var_id, var_name, var_description, var_type, var_shop_id, var_price) VALUES
(1,'Large','30 cm diameter.','size',1,6.34),
(2,'Medium','25 cm diameter.','size',1,4.89),
(3,'Small','20cm diameter','size',1,2.41),
(4,'Extra Large','35 cm diameter.','size',2,8.39),
(5,'Large ','30 cm diameter.','size',2,6.73),
(6,'Medium','20 cm diameter.','size',2,4.48),
(7,'Monster','1 m diameter.','size',3,12.21),
(8,'Pacifier','1.3 m diameter.','size',3,14.61),
(9,'Medium','50cm diameter.','size',3,10.44),
(10,'Large','25 cm diameter.','size',3,8.34),
(26,'Thick crust','Thick, chewy and crispy crust.','crust',1,3.38),
(27,'Thin crust','Slim crusty crust.','crust',1,1.87),
(28,'Thick crust','Thick, chewy and crispy crust.','crust',2,2.23),
(29,'Thin crust','Slim crusty crust.','crust',2,4.51),
(30,'Thick crust','Thick, chewy and crispy crust.','crust',3,2.89),
(31,'Thin crust','Slim crusty crust.','crust',3,3.93);
--
-- Data for Name: menu_variation; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.menu_variation (mv_menu_id, mv_variation_id) VALUES
(1,1),
(1,2),
(1,3),
(1,26),
(1,27),
(2,1),
(2,2),
(2,3),
(2,26),
(2,27),
(3,1),
(3,2),
(3,3),
(3,26),
(3,27),
(4,1),
(4,2),
(4,3),
(4,26),
(4,27),
(5,1),
(5,2),
(5,3),
(5,26),
(5,27),
(6,1),
(6,2),
(6,3),
(6,26),
(6,27),
(7,1),
(7,2),
(7,3),
(7,26),
(7,27),
(9,4),
(9,5),
(9,6),
(9,28),
(9,29),
(10,4),
(10,5),
(10,6),
(10,28),
(10,29),
(11,4),
(11,5),
(11,6),
(11,28),
(11,29),
(12,4),
(12,5),
(12,6),
(12,28),
(12,29),
(13,4),
(13,5),
(13,6),
(13,28),
(13,29),
(14,4),
(14,5),
(14,6),
(14,28),
(14,29),
(15,4),
(15,5),
(15,6),
(15,28),
(15,29),
(16,4),
(16,5),
(16,6),
(16,28),
(16,29),
(17,4),
(17,5),
(17,6),
(17,28),
(17,29),
(18,7),
(18,8),
(18,9),
(18,10),
(18,30),
(18,31),
(19,7),
(19,8),
(19,9),
(19,10),
(19,30),
(19,31),
(20,7),
(20,8),
(20,9),
(20,10),
(20,30),
(20,31),
(21,7),
(21,8),
(21,9),
(21,10),
(21,30),
(21,31),
(22,7),
(22,8),
(22,9),
(22,10),
(22,30),
(22,31),
(23,7),
(23,8),
(23,9),
(23,10),
(23,30),
(23,31);


--
-- Data for Name: extra_ingredients; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.extra_ingredients (ext_id, ext_name, ext_description, ext_price, ext_shop, ext_category_id) VALUES
(1,'Pepperoni','Extra pepperoni.',0.9,1,1),
(2,'Anchovies','Extra anchovies.',0.9,1,1),
(3,'Corn','Extra corn.',0.9,1,1),
(4,'Ham','Extra ham.',0.9,1,1),
(5,'Muzzarella','Extra muzzarella cheese.',0.9,1,1),
(6,'Pinapple','Extra pinapple.',1,2,1),
(7,'Peppers','Extra peppers.',1.1,2,1),
(8,'Tomato Sauce','Extra tomato sauce.',1.1,2,1),
(9,'Bacon','Extra bacon.',1.1,2,1),
(10,'Chicken','Extra chicken topping.',1.2,3,1),
(11,'Extra steak','Extra steak topping.',1.2,3,1),
(12,'Sausage','Extra sausage topping.',1,3,1),
(13,'Brocoli','Extra brocoli topping.',0.5,3,1),
(14,'Onions','sliced onions',1,1,1),
(15,'Onions','sliced onions',1,2,1),
(16,'Onions','sliced onions',1,3,1);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

--INSERT INTO public.migrations (id, migration, batch) VALUES
--(1,'2020_07_04_195818_create_order_status_table',1),
--(2,'2020_08_29_035507_create_clients_table',1),
--(3,'2020_08_29_064531_create_roles_table',1),
--(4,'2020_08_29_064532_create_currencies_table',1),
--(5,'2020_08_29_064533_create_shops_table',1),
--(6,'2020_08_29_064659_create_categories_table',1),
--(7,'2020_08_29_064930_create_shops_categories_table',1),
--(8'2020_08_29_064932_create_extra_ingredients_table',1),
--(9,'2020_08_29_161924_create_menu_table',1),
--(10,'2020_08_29_164941_create_variations_table',1),
--(11,'2020_08_29_165817_create_orders_table',1),
--(12,'2020_08_29_173140_create_orders_menu_table',1),
--(13,'2020_08_29_174221_create_orders_menu_extra_table',1),
--(14,'2020_08_29_174228_create_orders_menu_variation_table',1),
--(15,'2020_08_29_191239_create_menu_variation_table',1),
--(16,'2020_07_04_195818_create_order_status_table',1),
--(17,'2020_08_29_035507_create_clients_table',1),
--(18,'2020_08_29_064531_create_roles_table',1),
--(19,'2020_08_29_064532_create_currencies_table',1),
--(20,'2020_08_29_064533_create_shops_table',1),
--(21,'2020_08_29_064659_create_categories_table',1),
--(22,'2020_08_29_064930_create_shops_categories_table',1),
--(23,'2020_08_29_064932_create_extra_ingredients_table',1),
--(24,'2020_08_29_161924_create_menu_table',1),
--(25,'2020_08_29_164941_create_variations_table',1),
--(26,'2020_08_29_165817_create_orders_table',1),
--(27,'2020_08_29_173140_create_orders_menu_table',1),
--(28,'2020_08_29_174221_create_orders_menu_extra_table',1),
--(29,'2020_08_29_174228_create_orders_menu_variation_table',1),
--(30,'2020_08_29_191239_create_menu_variation_table',1);


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

INSERT INTO public.order_status (sta_id, sta_name) VALUES (1,'Pending');



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

--INSERT INTO public.orders (ord_id, ord_shop, ord_date, ord_cli_address, ord_cli_telephone, ord_cli_name, ord_cli_email, ord_cli_id, ord_observations, ord_currency, ord_shop_currency, ord_shipping, ord_conversion, ord_total, ord_status) VALUES
--1'2'2020-09-06 05:46:37-03''3110 Main St Ste 300 Santa Monica, CA 90405-5354.''123213''Arnold Schwarzenegger''test2@arnold.com'4'\N'128'1.18''81.56''1
--3'2'2021-01-22 17:21:09-03''asdasd''132123''luis''asasd@adsasd.com''\N''asdasdasdad'128'1.21''4.418''1
--4'2'2021-01-22 17:21:49-03''3110 Main St Ste 300 Santa Monica, CA 90405-5354.''123213''Arnold Schwarzenegger''test2@arnold.com'4'xvxcv'2281'79.678''1



--
-- Data for Name: orders_menu; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

--INSERT INTO public.orders_menu (om_id, om_order_id, om_menu_id, om_quantity, om_price) VALUES
--1'1'10'3'10.7
--2'2'10'1'10.7
--3'3'45'3'1.47
--4'493'11.86
--5'4'31'1'2.63


--
-- Data for Name: orders_menu_extra; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

--INSERT INTO public.orders_menu_extra (ome_order_menu_id, ome_extra_id) VALUES
--(1,8),
--(1,7),
--(1,6),
--(2,6),
--(2,8),
--(2,7),
--(4,6),
--(4,8),
--(4,7),


--
-- Data for Name: orders_menu_variation; Type: TABLE DATA; Schema: public; Owner: mutz_hub_user
--

--INSERT INTO public.orders_menu_variation (omv_order_menu_id, omv_variation_id) VALUES
--(1,4),
--(1,28),
--(2,4),
--(2,28),
--(4,4),
--(4,28),


--
-- Name: categories_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.categories_cat_id_seq', 3, true);


--
-- Name: clients_cli_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.clients_cli_id_seq', 7, true);


--
-- Name: currencies_curr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.currencies_curr_id_seq', 2, true);


--
-- Name: extra_ingredients_ext_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.extra_ingredients_ext_id_seq', 16, true);


--
-- Name: menu_men_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.menu_men_id_seq', 53, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.migrations_id_seq', 30, true);


--
-- Name: order_status_sta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.order_status_sta_id_seq', 1, true);


--
-- Name: orders_menu_om_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.orders_menu_om_id_seq', 5, true);


--
-- Name: orders_ord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.orders_ord_id_seq', 4, true);


--
-- Name: roles_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.roles_rol_id_seq', 2, true);


--
-- Name: shops_sho_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.shops_sho_id_seq', 3, true);


--
-- Name: variations_var_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mutz_hub_user
--

--SELECT pg_catalog.setval('public.variations_var_id_seq', 31, true);


--
-- Name: categories idx_16390_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.categories
--	ADD CONSTRAINT idx_16390_primary PRIMARY KEY (cat_id);


--
-- Name: clients idx_16396_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

------ALTER TABLE ONLY public.clients
--	ADD CONSTRAINT idx_16396_primary PRIMARY KEY (cli_id);


--
-- Name: currencies idx_16405_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.currencies
--	ADD CONSTRAINT idx_16405_primary PRIMARY KEY (curr_id);


--
-- Name: extra_ingredients idx_16411_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.extra_ingredients
--	ADD CONSTRAINT idx_16411_primary PRIMARY KEY (ext_id);


--
-- Name: menu idx_16417_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu
--	ADD CONSTRAINT idx_16417_primary PRIMARY KEY (men_id);


--
-- Name: migrations idx_16426_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.migrations
--	ADD CONSTRAINT idx_16426_primary PRIMARY KEY (id);


--
-- Name: orders idx_16432_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT idx_16432_primary PRIMARY KEY (ord_id);


--
-- Name: orders_menu idx_16442_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu
--	ADD CONSTRAINT idx_16442_primary PRIMARY KEY (om_id);


--
-- Name: order_status idx_16454_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.order_status
--	ADD CONSTRAINT idx_16454_primary PRIMARY KEY (sta_id);


--
-- Name: roles idx_16460_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.roles
--	ADD CONSTRAINT idx_16460_primary PRIMARY KEY (rol_id);


--
-- Name: shops idx_16466_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops
--	ADD CONSTRAINT idx_16466_primary PRIMARY KEY (sho_id);


--
-- Name: shops_categories idx_16473_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops_categories
--	ADD CONSTRAINT idx_16473_primary PRIMARY KEY (sc_shop_id, sc_category_id);


--
-- Name: variations idx_16478_primary; Type: CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.variations
--	ADD CONSTRAINT idx_16478_primary PRIMARY KEY (var_id);


--
-- Name: idx_16396_clients_cli_email_unique; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE UNIQUE INDEX idx_16396_clients_cli_email_unique ON public.clients USING btree (cli_email);


--
-- Name: idx_16411_extra_ingredients_ext_category_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16411_extra_ingredients_ext_category_id_foreign ON public.extra_ingredients USING btree (ext_category_id);


--
-- Name: idx_16411_extra_ingredients_ext_shop_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16411_extra_ingredients_ext_shop_foreign ON public.extra_ingredients USING btree (ext_shop);


--
-- Name: idx_16417_menu_men_category_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16417_menu_men_category_foreign ON public.menu USING btree (men_category);


--
-- Name: idx_16417_menu_men_shop_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16417_menu_men_shop_foreign ON public.menu USING btree (men_shop);


--
-- Name: idx_16421_menu_variation_mv_menu_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16421_menu_variation_mv_menu_id_foreign ON public.menu_variation USING btree (mv_menu_id);


--
-- Name: idx_16421_menu_variation_mv_variation_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16421_menu_variation_mv_variation_id_foreign ON public.menu_variation USING btree (mv_variation_id);


--
-- Name: idx_16432_orders_ord_cli_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16432_orders_ord_cli_id_foreign ON public.orders USING btree (ord_cli_id);


--
-- Name: idx_16432_orders_ord_currency_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16432_orders_ord_currency_foreign ON public.orders USING btree (ord_currency);


--
-- Name: idx_16432_orders_ord_shop_currency_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16432_orders_ord_shop_currency_foreign ON public.orders USING btree (ord_shop_currency);


--
-- Name: idx_16432_orders_ord_shop_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16432_orders_ord_shop_foreign ON public.orders USING btree (ord_shop);


--
-- Name: idx_16432_orders_ord_status_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16432_orders_ord_status_foreign ON public.orders USING btree (ord_status);


--
-- Name: idx_16442_orders_menu_om_menu_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16442_orders_menu_om_menu_id_foreign ON public.orders_menu USING btree (om_menu_id);


--
-- Name: idx_16442_orders_menu_om_order_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16442_orders_menu_om_order_id_foreign ON public.orders_menu USING btree (om_order_id);


--
-- Name: idx_16446_orders_menu_extra_ome_extra_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16446_orders_menu_extra_ome_extra_id_foreign ON public.orders_menu_extra USING btree (ome_extra_id);


--
-- Name: idx_16446_orders_menu_extra_ome_order_menu_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16446_orders_menu_extra_ome_order_menu_id_foreign ON public.orders_menu_extra USING btree (ome_order_menu_id);


--
-- Name: idx_16449_orders_menu_variation_omv_order_menu_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16449_orders_menu_variation_omv_order_menu_id_foreign ON public.orders_menu_variation USING btree (omv_order_menu_id);


--
-- Name: idx_16449_orders_menu_variation_omv_variation_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16449_orders_menu_variation_omv_variation_id_foreign ON public.orders_menu_variation USING btree (omv_variation_id);


--
-- Name: idx_16466_shops_sho_base_currency_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16466_shops_sho_base_currency_foreign ON public.shops USING btree (sho_base_currency);


--
-- Name: idx_16466_shops_sho_email_unique; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE UNIQUE INDEX idx_16466_shops_sho_email_unique ON public.shops USING btree (sho_email);


--
-- Name: idx_16466_shops_sho_role_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16466_shops_sho_role_id_foreign ON public.shops USING btree (sho_role_id);


--
-- Name: idx_16473_shops_categories_sc_category_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16473_shops_categories_sc_category_id_foreign ON public.shops_categories USING btree (sc_category_id);


--
-- Name: idx_16478_variations_var_shop_id_foreign; Type: INDEX; Schema: public; Owner: mutz_hub_user
--

--CREATE INDEX idx_16478_variations_var_shop_id_foreign ON public.variations USING btree (var_shop_id);


--
-- Name: extra_ingredients extra_ingredients_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.extra_ingredients
--	ADD CONSTRAINT extra_ingredients_categories_fk FOREIGN KEY (ext_category_id) REFERENCES public.categories(cat_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: extra_ingredients extra_ingredients_shop_fk; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.extra_ingredients
--	ADD CONSTRAINT extra_ingredients_shop_fk FOREIGN KEY (ext_shop) REFERENCES public.shops(sho_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu menu_category_fk; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu
--	ADD CONSTRAINT menu_category_fk FOREIGN KEY (men_category) REFERENCES public.categories(cat_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu menu_shop_fk; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu
--	ADD CONSTRAINT menu_shop_fk FOREIGN KEY (men_shop) REFERENCES public.shops(sho_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu_variation menu_variation_mv_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu_variation
--	ADD CONSTRAINT menu_variation_mv_menu_id_foreign FOREIGN KEY (mv_menu_id) REFERENCES public.menu(men_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu_variation menu_variation_mv_variation_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.menu_variation
--	ADD CONSTRAINT menu_variation_mv_variation_id_foreign FOREIGN KEY (mv_variation_id) REFERENCES public.variations(var_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu_extra orders_menu_extra_ome_extra_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu_extra
--	ADD CONSTRAINT orders_menu_extra_ome_extra_id_foreign FOREIGN KEY (ome_extra_id) REFERENCES public.extra_ingredients(ext_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu_extra orders_menu_extra_ome_order_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu_extra
--	ADD CONSTRAINT orders_menu_extra_ome_order_menu_id_foreign FOREIGN KEY (ome_order_menu_id) REFERENCES public.orders_menu(om_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu orders_menu_om_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu
--	ADD CONSTRAINT orders_menu_om_menu_id_foreign FOREIGN KEY (om_menu_id) REFERENCES public.menu(men_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu orders_menu_om_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu
--	ADD CONSTRAINT orders_menu_om_order_id_foreign FOREIGN KEY (om_order_id) REFERENCES public.orders(ord_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu_variation orders_menu_variation_omv_order_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu_variation
--	ADD CONSTRAINT orders_menu_variation_omv_order_menu_id_foreign FOREIGN KEY (omv_order_menu_id) REFERENCES public.orders_menu(om_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_menu_variation orders_menu_variation_omv_variation_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders_menu_variation
--	ADD CONSTRAINT orders_menu_variation_omv_variation_id_foreign FOREIGN KEY (omv_variation_id) REFERENCES public.variations(var_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ord_cli_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT orders_ord_cli_id_foreign FOREIGN KEY (ord_cli_id) REFERENCES public.clients(cli_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ord_currency_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT orders_ord_currency_foreign FOREIGN KEY (ord_currency) REFERENCES public.currencies(curr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ord_shop_currency_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT orders_ord_shop_currency_foreign FOREIGN KEY (ord_shop_currency) REFERENCES public.currencies(curr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ord_shop_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT orders_ord_shop_foreign FOREIGN KEY (ord_shop) REFERENCES public.shops(sho_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_ord_status_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.orders
--	ADD CONSTRAINT orders_ord_status_foreign FOREIGN KEY (ord_status) REFERENCES public.order_status(sta_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shops_categories shops_categories_sc_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops_categories
--	ADD CONSTRAINT shops_categories_sc_category_id_foreign FOREIGN KEY (sc_category_id) REFERENCES public.categories(cat_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shops_categories shops_categories_sc_shop_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops_categories
--	ADD CONSTRAINT shops_categories_sc_shop_id_foreign FOREIGN KEY (sc_shop_id) REFERENCES public.shops(sho_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shops shops_sho_base_currency_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops
--	ADD CONSTRAINT shops_sho_base_currency_foreign FOREIGN KEY (sho_base_currency) REFERENCES public.currencies(curr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shops shops_sho_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.shops
--	ADD CONSTRAINT shops_sho_role_id_foreign FOREIGN KEY (sho_role_id) REFERENCES public.currencies(curr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: variations variations_var_shop_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: mutz_hub_user
--

----ALTER TABLE ONLY public.variations
--	ADD CONSTRAINT variations_var_shop_id_foreign FOREIGN KEY (var_shop_id) REFERENCES public.shops(sho_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
