const Mock = require('mockjs')
// const result = require("element-ui/packages/result");
// const da = require("element-ui/src/locale/lang/da");
const Random = Mock.Random;

let Result1 = {
    status:200,
    message: 'success',
    data: {
        id:'1013',
    }
}



Mock.mock('/getImage','get',() =>{
    Result1.data.captureImage = Random.dataImage('120x40','12345')
    Result1.data.realValid = '1231'

    return Result1
})

// Mock.mock('/login','post',() =>{
//     Result1.code=200
//     return Result1
// })

Mock.mock('/user/login','post',(config) =>{
    console.log(config)
    Result1.status=200
    Result1.msg = '看看自己那里输错了'
    return Result1
})
//
// Mock.mock('/user/register','post',(config) =>{
//     console.log(config)
//     Result1.status=408
//     Result1.msg = '看看自己那里输错了'
//     return Result1
// })

Mock.mock('/homepage',
    'get',
    () => {
        Result1.data = [{id:1,key:'a'},{id:2,key:'b'},{id:3,key:'c'}]
        return Result1
    })
var dataMock = Mock.mock({
    'data|30': [
        {
            'direction|0-359': 0, //角度0-359
            'posType|1': ['GPS', 'LBS', 'WIFI'],
            address: '@province@city@county' //省市县地址
        }
    ]
})
Mock.mock('/homepage2',
    'get',
    ()=>{
    console.log("this is in mock",typeof(dataMock))
        return {
        status: 200,
        msg: 'Mock接口模拟数据',
        dataMock
    }
})

let resultAddBlock ={
    status : 200,
    msg:"wonidie",
    data:{
        newBlockWords:[]
    }
}
Mock.mock(/\/admin\/addBlockWords(.*)/,'get',(options)=>{
    let path = options.url.match(/\/admin\/addBlockWords(.*)/)
    console.log(path)
    let param = path[1].match(/(.*)\?(.*)=(.*)/)
    console.log("this is option",options)
    console.log(options.url)
    resultAddBlock.status=200
    resultAddBlock.msg=param[3]+"from mock-addBlockWords"
    resultAddBlock.data.newBlockWords=JSON.stringify([{blockUnit:"111"},{blockUnit:"222"},{blockUnit:"333"}])
    return resultAddBlock
})

let resultDeleteBlock ={
    status : 200,
    msg:"uuuuuuDDDD"
}
Mock.mock((/\/admin\/deleteBlockWords(.*)/),'get',(options)=>{
    let path = options.url.match(/\/admin\/deleteBlockWords(.*)/)
    let param = path[1].match(/(.*)\?(.*)=(.*)/)
    console.log("this is option",options)
    console.log(options.url)
    resultDeleteBlock.status=200
    resultDeleteBlock.msg=param[3]+"from mock-deleteBlockWords"
    return resultDeleteBlock
})

let resultBlockWords ={
    status:200,
    msg:'success',
    data:{
        blockWords:[]
    }
}
Mock.mock('admin/getAllBlockWords','get',(options)=>{
    console.log(options)
    resultBlockWords.data.blockWords=JSON.stringify([{
        blockUnit:'kkk',
    },
        {
            blockUnit: 'xijinping',
        },
        {
            blockUnit: 'xijinping',
        },
        {
            blockUnit: 'xijinping',
        },
        {
            blockUnit: 'xijinping',
        },
        {
            blockUnit: 'xijinping',
        },
        {
            blockUnit: 'xijinping',
        },])

    return resultBlockWords

})

let resultUserAvatar= {
    status:200,
    msg:"success",
    data:{
        id:0
    }
}
Mock.mock((/\/user\/getUserAvatar(.*)/),'get',(options)=>{
    console.log(options)
    resultUserAvatar.data.id=1
    return resultUserAvatar
})

let homeResultNotification1 = {
    status:200,
    msg:"success",
    data:{
        newLikeAndComment:100
    }
}

let homeResultNotification2 = {
    status:200,
    msg:"success",
    data:{
        newLikeAndComment:0
    }
}
Mock.mock(RegExp('/user/checkNotification(.*)'),'get',(options)=>{
    console.log(options)
    return homeResultNotification1
})
// Mock.mock('/user/checkNotification','get',(options)=>{
//     console.log(options)
//     return homeResultNotification2
// })

let postListResult = {
    // meta:{
    //     status:200
    // },
    status:200,
    msg:"success",
    totalpage:1,
    postList:[{
        userName: "dandan1",
        title: "i am post title1",
        avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        id:0,
    },
        {
            userName: "dandan2",
            title: "i am post title2",
            avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            id:1,
        },
        {
            userName: "dandan8",
            title: "i am post title3",
            avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            id:2,
        },
        // {
        //     userName: "dandan3",
        //     title: "i am post title4",
        //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //     id:3,
        // },
        // {
        //     userName: "dandan4",
        //     title: "i am post title5",
        //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //     id:4,
        // },
        {
            userName: "dandan5",
            title: "i am post title6",
            avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            id:5,
        }],
    data:{
        postList:[{
            userName: "dandan1",
            title: "i am post title1",
            avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            id:0,
        },
            {
                userName: "dandan2",
                title: "i am post title2",
                avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                id:1,
            },
            {
                userName: "dandan8",
                title: "i am post title3",
                avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                id:2,
            },
            // {
            //     userName: "dandan3",
            //     title: "i am post title4",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:3,
            // },
            // {
            //     userName: "dandan4",
            //     title: "i am post title5",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:4,
            // },
            {
                userName: "dandan5",
                title: "i am post title6",
                avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                id:5,
            }],
    }
}

Mock.mock(RegExp('/post/queryPost(.*)'),'get',(option)=>{
    return postListResult
})

let myPostListResultPost = {
    status:200,
    msg:"hahaha",
    totalpage:1,
    postList:[
        {
        id: '0',
        writerName: "kun",
        title: 'today is a nice dat',
        avatar:1
        },
        {
            id: '1',
            writerName: "kun",
            title: 'today is a nice dat',
            avatar:1
        },
        {
            id: '2',
            writerName: "kun",
            title: 'today is a nice dat',
            avatar:1
        },
        {
            id: '3',
            writerName: "kun",
            title: 'today is a nice dat',
            avatar:1
        }],
    data:{
        postList:[{
            userName: "dandan1",
            title: "i am post title1",
            avatar:1,
            id:0,
        },
            {
                userName: "dandan2",
                title: "i am post title2",
                avatar:1,
                id:1,
            },
            {
                userName: "dandan8",
                title: "i am post title3",
                avatar:1,
                id:2,
            },
            // {
            //     userName: "dandan3",
            //     title: "i am post title4",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:3,
            // },
            // {
            //     userName: "dandan4",
            //     title: "i am post title5",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:4,
            // },
            {
                userName: "dandan5",
                title: "i am post title6",
                avatar:1,
                id:5,
            }],
    }
}

Mock.mock(RegExp('/user/getPersonalPost(.*)'),'get',(config)=>{
    console.log(config)
    return myPostListResultPost
})


let notificationResult = {
    status:200,
    msg:"hahaha",
    totalpage:1,
    data:{
        postList:[{
            userName: "dandan1",
            title: "i am post title1",
            avatar:1,
            id:0,
            likeNum:5,
            commentNum:4
        },
            {
                userName: "dandan2",
                title: "i am post title2",
                avatar:1,
                id:1,
                likeNum:5,
                commentNum:4
            },
            {
                userName: "dandan8",
                title: "i am post title3",
                avatar:1,
                id:2,
                likeNum:5,
                commentNum:4
            },
            // {
            //     userName: "dandan3",
            //     title: "i am post title4",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:3,
            // },
            // {
            //     userName: "dandan4",
            //     title: "i am post title5",
            //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //     id:4,
            // },
            {
                userName: "dandan5",
                title: "i am post title6",
                avatar:1,
                id:5,
                likeNum:0,
                commentNum:4
            }],
    }
}
let notificationResult1 = {
    status:200,
    msg:"hahaha",
    // totalpage:1,
    postList:[{
        userName: "dandan1",
        title: "i am post title1",
        avatar:1,
        id:0,
        likeNum:5,
        commentNum:4
    },
        {
            userName: "dandan2",
            title: "i am post title2",
            avatar:1,
            id:1,
            likeNum:5,
            commentNum:4
        },
        {
            userName: "dandan8",
            title: "i am post title3",
            avatar:1,
            id:2,
            likeNum:5,
            commentNum:4
        },
        {
            userName: "dandan3",
            title: "i am post title4",
            avatar:1,
            likeNum:0,
            commentNum:4,
            id:3,
        },
        {
            userName: "dandan4",
            title: "i am post title5",
            avatar:1,
            likeNum:0,
            commentNum:4,
            id:4,
        },
        // {
        //     userName: "dandan5",
        //     title: "i am post title6",
        //     avatar:1,
        //     id:5,
        //     likeNum:0,
        //     commentNum:4
        // }
        ],
    // data:{
    //     postList:[{
    //         userName: "dandan1",
    //         title: "i am post title1",
    //         avatar:1,
    //         id:0,
    //         likeNum:5,
    //         commentNum:4
    //     },
    //         {
    //             userName: "dandan2",
    //             title: "i am post title2",
    //             avatar:1,
    //             id:1,
    //             likeNum:5,
    //             commentNum:4
    //         },
    //         {
    //             userName: "dandan8",
    //             title: "i am post title3",
    //             avatar:1,
    //             id:2,
    //             likeNum:5,
    //             commentNum:4
    //         },
    //         // {
    //         //     userName: "dandan3",
    //         //     title: "i am post title4",
    //         //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    //         //     id:3,
    //         // },
    //         // {
    //         //     userName: "dandan4",
    //         //     title: "i am post title5",
    //         //     avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    //         //     id:4,
    //         // },
    //         {
    //             userName: "dandan5",
    //             title: "i am post title6",
    //             avatar:1,
    //             id:5,
    //             likeNum:0,
    //             commentNum:4
    //         }],
    // }
}
let notificationResult2 = {
    status:200,
    msg:"hahaha",
    totalpage:1,
    postList:[]
}
let notificationResult3 = {
    "totalpage": 1,
    "msg": "Successful get notification posts.",
    "data": {
        "totalpage": 1,
        "postList": [
            {
                "anonymous": 0,
                "avatar": 0,
                "content": "test",
                "criticism": 0,
                "id": 2,
                "isDeleted": 0,
                "newComments": 10,
                "newLikes": 10,
                "title": "test",
                "totalCollects": 0,
                "totalLikes": 0,
                "views": 0,
                "writerId": 10002,
                "writtenTime": 1652009005000
            },
            {
                "anonymous": 0,
                "avatar": 0,
                "content": "test321",
                "criticism": 0,
                "id": 3,
                "isDeleted": 0,
                "newComments": 10,
                "newLikes": 10,
                "title": "test123",
                "totalCollects": 0,
                "totalLikes": 0,
                "views": 0,
                "writerId": 10002,
                "writtenTime": 1652013422000
            }
        ],
        "pagenum": 1
    },
    "status": 200
}
Mock.mock(RegExp('/user/getNotificationPost(.*)'),'get',(config)=>{
    console.log(config)
    return notificationResult3
})

let resultClearNotification = {
    status:200,
}
Mock.mock(RegExp('/user/clearNotification(.*)'),'get',(config)=>{
    console.log(config)
    console.log("enter clear")
    return resultClearNotification
})