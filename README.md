# Event backend

Энэ repo event-ийн backend-ны кодын агуулна.

## Эхлэх (Орчин)
1. Git
2. Node
3. Yarn See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/) 
4. Энэ repo-г fork хийнэ.

### Git configuration
  #### `Origin нэмэх === өөрийн local git-ийг нэмэх`

    - git add remote origin гээд өөрийн repo-гийнхоо url-ийн оруулна. Жишээ: `git add remote add origin https://github.com/bilg08/event-backend.git`
  #### `Upstream нэмэх ===  main кодны git-ийг нэмэх`
    - git add remote upsteam гээд repo-ны url-ийн оруулна . Жишээ: `git add remote add upsteam https://github.com/PineconeLeap3DemoDay/event-beckend.git`

### Ажилуулах
1. `yarn dev`

### Create a branch

1.  өөрийн local `event-admin` repository-гоос `git checkout main` коммандыг хийн main branch руугаа шилжинэ
2. `git pull origin main` хамгийн сүүлийн өөрчлөлтийн авах өөрийн local main branch-руугаа татаж авна
3. `git checkout -b the-name-of-my-branch` (`the-name-of-my-branch` 
    ийг өөрийн хүссэн нэрэээрээ солиж болно) коммандыг хийн branch үүсгэнэ

### Push хийх
1. `git add . эсвэл git add changedfile.js`
2. `yarn commit дэлгэрэнгүй юу өөрчилсөнөө бичнэ"`
3. `git push -u origin the name-of-my-branch`
