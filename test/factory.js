import { Factory } from 'typeorm-factory';
import { User } from '../src/entity/User';
// エンティティ(モデル)のComment, Author, Postもインポートしておく

// .attr → 普通のカラムはこれで作ります
// .secuence → ユニーク成約等があるカラムの場合はindexを受取る無名関数を使って一意化出来ます
export const UserFactory = new Factory(User)
  .sequence('text', i => `text ${i}`)
  .attr('firstName', 'John').a;

// export const AuthorFactory = new Factory(Author)
//     .sequence("firstName", (i) => `John ${i}`)
//     .sequence("lastName", (i) => `Doe ${i}`);

// .assocMany → toManyリレーション作成。最後の引数で一気に作る数を指定出来ます
// .assocOne → toOneリレーションを作成
// export const PostFactory = new Factory(Post)
//     .sequence("title", (i) => `title ${i}`)
//     .sequence("text", (i) => `text ${i}`)
//     .attr("likesCount", 10)
//     .assocMany("comments", CommentFactory, 2)
//     .assocOne("author", AuthorFactory);
