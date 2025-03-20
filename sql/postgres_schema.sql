CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY,
                                 title VARCHAR(255) NOT NULL,
                                 description TEXT,
                                 status VARCHAR(50) NOT NULL CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE'))
                                 );

INSERT INTO task (title, description, status) VALUES
('Create Backend', 'Develop Spring Boot API', 'TODO'),
('Setup Database', 'Config Postgres', 'IN_PROGRESS'),
('Build Frontend', 'Create UI using React', 'DONE');