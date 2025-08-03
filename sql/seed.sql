-- Usuario demo
INSERT INTO users (clerk_id, email, name, avatar_url)
VALUES (
  'user_123456',
  'demo@blog.com',
  'Demo User',
  'https://i.pravatar.cc/150?u=demo@blog.com'
)
ON CONFLICT (clerk_id) DO NOTHING;

-- Post demo
INSERT INTO posts (title, content, image_url, tags, published, author_id)
SELECT
  '¡Hola mundo!',
  'Este es el primer post de prueba.',
  'https://picsum.photos/seed/post1/600/300',
  ARRAY['bienvenida', 'blog'],
  TRUE,
  id
FROM users WHERE clerk_id = 'user_123456'
ON CONFLICT DO NOTHING;

-- Comentario demo
INSERT INTO comments (post_id, author_id, content)
SELECT
  (SELECT id FROM posts WHERE title = '¡Hola mundo!' LIMIT 1),
  (SELECT id FROM users WHERE clerk_id = 'user_123456' LIMIT 1),
  '¡Primer comentario de prueba!'
ON CONFLICT DO NOTHING;
