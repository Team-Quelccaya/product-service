CREATE TABLE styles
(
  style_id BIGSERIAL,
  product_id INTEGER,
  name VARCHAR(250),
  sale_price VARCHAR(250),
  original_price VARCHAR(250),
  default_style SMALLINT
);


ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (style_id);

CREATE TABLE product
(
  product_id BIGSERIAL,
  name VARCHAR(250),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(250),
  default_price VARCHAR(250)
);


ALTER TABLE product ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);

CREATE TABLE features
(
  features_id BIGSERIAL,
  product_id INTEGER,
  feature VARCHAR(250),
  value VARCHAR(250)
);


ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (features_id);

CREATE TABLE photos
(
  photo_id BIGSERIAL,
  style_id INTEGER,
  url TEXT,
  thumbnail_url TEXT,
  extra TEXT
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);

CREATE TABLE skus
(
  sku_id BIGSERIAL,
  style_id INTEGER,
  size VARCHAR(50),
  quantity INTEGER
);


ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (sku_id);

CREATE TABLE related
(
  r_id BIGSERIAL,
  current_product_id INTEGER,
  related_product_id INTEGER
);


ALTER TABLE related ADD CONSTRAINT related_pkey PRIMARY KEY (r_id);

ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES product(product_id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES product(product_id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(style_id);
ALTER TABLE related ADD CONSTRAINT related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES product(product_id);