<template>
  <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="ruleForm.role" placeholder="请选择角色">
        <el-option label="学生" value="0"></el-option>
        <el-option label="教师" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="爱好" prop="hobby">
      <el-checkbox-group v-model="ruleForm.hobby">
        <el-checkbox label="0" name="hobby">跑步</el-checkbox>
        <el-checkbox label="1" name="hobby">打篮球</el-checkbox>
        <el-checkbox label="2" name="hobby">踢足球</el-checkbox>
        <el-checkbox label="4" name="hobby">听音乐</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "FormValidate",
  data() {
    //自定义验证规则，在rules中使用
    //手机号验证
    let phoneValidate = (rule,value,callback) => {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

      // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,9}$/;
      if (!value) {
        //如果为空就回调错误的信息
        return callback(new Error("密码不能为空"));
      }
      if (!phoneReg.test(value)) {
        callback(new Error('please input legal password'));
      }
      else{
        callback();
      }
    };
    return {
      ruleForm: {
        hobby: []
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        hobby: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个爱好",
            trigger: "change"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, validator: phoneValidate, trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(JSON.stringify(this.ruleForm));
          //清除表单验证规则
          this.$refs[formName].clearValidate()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
