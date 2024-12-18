const Sequlize = require('sequelize')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')

// class명은 파일명과 똑같이 작성하되 대문자로 시작
module.exports = class User extends Sequlize.Model {
   static init(sequelize) {
      return super.init(
         {
            //name 컬럼 정의
            name: {
               type: Sequlize.STRING(20), //varchar(20)
               allowNull: false, //제약조건 - null허용 여부
               unique: true, //제약조건 - 중복허용 여부
            },
            //age 컬럼 정의
            age: {
               type: Sequlize.INTEGER.UNSIGNED,
               allowNull: false,
            },
            //married 컬럼 정의
            married: {
               type: Sequlize.BOOLEAN, //true, false 값을 저장하는 타입 tinyint
               allowNull: false,
            },
            //comment 컬럼 정의
            comment: {
               type: Sequlize.TEXT, //text
               allowNull: false,
            },
            //create_at 컬럼 정의
            create_at: {
               type: Sequlize.DATE, //날짜와 시간을 저장하는 datetime
               allowNull: false,
               defaultValue: Sequlize.NOW, //디폴트값으로 현재 시간 설정
            },
         },
         {
            sequelize,
            timestamps: false, //자동생성되는 createAt과 uqdateAt 컬럼을 활성화여부->비활성화
            //createAt: 테이블에 insert할때 날짜와 시간값이 자동으로 insert되는 컬럼
            //updateAt: 테이블에 update할떄 날짜와 시간값이 자동으로 insert되는 컬럼
            underscored: false, //컬럼이름을 카멜케이스로 유지할건지 -> 유지x
            modelName: 'User', //시퀄라이즈에서 사용하는 모델이름(클래스명 작성)
            tableName: 'users', //데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, //소프트 삭제(soft delete) 활성화 여부 -> 비활성화
            charset: 'utf8mb4', //데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', //데이터베이스 생성할때 collate와 똑같이 사용
         }
      )
   }
   static associate(db) {
      //User:Comment = 1:n
      //User가 Comment를 가지고 있다(User가 부모테이블, Comment는 자식 테이블)
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter',
         sourceKey: 'id', //User에서 Comment에게 외래키로 제공할 컬럼이름
      })
   }
}
