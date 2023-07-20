CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create type CART_STATUS AS ENUM ('OPEN', 'ORDERED');
create table carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid DEFAULT uuid_generate_v4() not null,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status CART_STATUS NOT NULL
);

create table cart_items (
    product_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    count integer,
    cart_id UUID NOT NULL,
    foreign key (cart_id) references carts (id)
);
</pre>

SQL script to fill tables with test examples.
Store it in your Github repository.
Execute it for your DB to fill data.

INSERT INTO carts (user_id, created_at, updated_at, status)
VALUES
(uuid_generate_v4(), '2023-07-10', '2023-07-10', 'OPEN'),
(uuid_generate_v4(), '2023-07-11', '2023-07-11', 'ORDERED'),
(uuid_generate_v4(), '2023-07-12', '2023-07-12', 'OPEN');

INSERT INTO cart_items (product_id, count, cart_id)
VALUES
(uuid_generate_v4(), 2, (SELECT id FROM carts WHERE status='OPEN' LIMIT 1)),
(uuid_generate_v4(), 1, (SELECT id FROM carts WHERE status='ORDERED' LIMIT 1)),
(uuid_generate_v4(), 3, (SELECT id FROM carts WHERE created_at='2023-07-12' LIMIT 1));
