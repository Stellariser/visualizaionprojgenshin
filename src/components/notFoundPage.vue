<template>
    <div class="common-layout">
        <el-container>
            <el-header>Welcome to XJTLU Bonding!</el-header>
            <el-main><div>  404 NOT FOUND!</div></el-main>
            <div class = "box">
                <el-form label-width="0px" class="login_form">
                    <el-form-item class="btns">
                        <el-button @click = "back" type="primary">Go Back</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-footer>May the joy and happiness around you today and always!</el-footer>
        </el-container>

    </div>
</template>

<script>
    export default {
        name:'notfound',
        methods: {
            back: function (){
                this.$router.push('/login')
            }
        }
    }

</script>

<style lang="less" scoped>
    .login_container{
        background-color: #00428f;
        height: 100%;
    }

    .box{
        width:300px;
        height:200px;
        background-color: #E0E0DF;
        border-radius:3px;
        position: absolute;
        left:50%;
        top:50%;
        opacity: 80%;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow:2px 2px 8px #aaaaaa;
        transform: translate(-50%,-50%);

        .btns{
            padding-top: 25%;
            display: flex;
            justify-content: center;
        }
    }
    .el-header,
    .el-footer {
        background-color: #6253FF;
        color: white;
        text-align: center;
        justify-content: center;
        font-size: large;
        font-style: italic;
        font-family: "UD Digi Kyokasho N-B";
        font-weight: bold;
        fill-opacity: 80%;
        line-height: 60px;
        border-radius: 7px;
        position: page;
    }

    .el-aside {
        background-color: #d3dce6;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #e9eef3;
        line-height: 780px;
        color: #6253FF;
        text-align: center;
        font-family: "BIZ UDGothic";
        font-size: 200px;
        opacity: 70%;
        font-weight: bold;
        overflow-y:hidden;
        overflow-x:hidden;
        transition: all 1s;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
