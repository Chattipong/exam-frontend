<template>
  <DefaultTemplate>
    <div class="content">
      <div id="home">
        <h2 class="mg-0 text-center color-main">Test Form and Validation</h2>
        <el-form
          label-position="top"
          :model="formValidate"
          ref="ruleForm"
          :rules="rules"
        >
          <el-form-item label="ชื่อจริง" prop="fName">
            <el-input
              v-model="formValidate.fName"
              placeholder="กรุณากรอกชื่อจริง"
              @blur="formValidate.fName = formValidate.fName.trim()"
            ></el-input>
          </el-form-item>
          <el-form-item label="นามสกุล" prop="lName">
            <el-input
              v-model="formValidate.lName"
              placeholder="กรุณากรอกนามสกุล"
              @blur="formValidate.lName = formValidate.lName.trim()"
            ></el-input>
          </el-form-item>
          <el-form-item label="อีเมล" prop="email">
            <el-input
              v-model="formValidate.email"
              placeholder="กรุณากรอกอีเมล"
            ></el-input>
          </el-form-item>
          <el-form-item label="รหัสผ่าน" prop="password">
            <el-input
              v-model="formValidate.password"
              show-password
              type="password"
              placeholder="กรุณากรอกรหัสผ่าน"
            ></el-input>
          </el-form-item>
          <el-form-item label="ยืนยัน รหัสผ่าน" prop="verifyPassword">
            <el-input
              v-model="formValidate.verifyPassword"
              show-password
              type="password"
              placeholder="กรุณากรอกยืนยันรหัสผ่าน"
            ></el-input>
          </el-form-item>
          <el-form-item label="เพศ" prop="gender">
            <el-select
              v-model="formValidate.gender"
              placeholder="กรุณาเลือกเพศ"
            >
              <el-option
                v-for="item in optionGender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="is-flex js-center mg-y-3">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >บันทึก</el-button
          >
          <el-button @click="resetForm('ruleForm')">ล้างข้อมูล</el-button>
        </div>
        <div v-if="showDetail">
          <p>ผลลัพธ์</p>
          <p>
            ชื่อจริง: <span class="pg-l-5">{{ formValidate.fName }}</span>
          </p>
          <p>
            นามสกุล: <span class="pg-l-5">{{ formValidate.lName }}</span>
          </p>
          <p>
            อีเมล: <span class="pg-l-5">{{ formValidate.email }}</span>
          </p>
          <p>
            เพศ:
            <span class="pg-l-5">{{ returnGender(formValidate.gender) }}</span>
          </p>
        </div>
      </div>
    </div>
  </DefaultTemplate>
</template>

<script>
import DefaultTemplate from "@/template/DefaultTemplate";

export default {
  components: {
    DefaultTemplate,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("กรุณากรอกรหัสผ่าน"));
      } else {
        if (value.length > 7) {
          if (this.formValidate.verifyPassword !== "") {
            this.$refs.ruleForm.validateField("verifyPassword");
          }
          callback();
        } else {
          callback(new Error("กรุณากรอกรหัสผ่านขั้นต่ำ 8 ตัวอักษร"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("กรุณากรอกยืนยันรหัสผ่าน"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("รหัสผ่านไม่เหมือนกัน กรุณากรอกอีกครั้ง !"));
      } else if (value.length<8) {
        callback(new Error("กรุณากรอกรหัสผ่านขั้นต่ำ 8 ตัวอักษร"));
      } else {
        callback();
      }
    };
    var validateThaiFname = (rule, value, callback) => {
      let regx = /^[^a-z^A-Z]+$/i;
      if (!regx.test(value)) {
        callback(new Error("กรุณากรอกชื่อจริงเป็นภาษาไทย"));
      } else {
        callback();
      }
    };
    var validateThaiLname = (rule, value, callback) => {
      let regx = /^[^a-z^A-Z]+$/i;
      if (!regx.test(value)) {
        callback(new Error("กรุณากรอกนามสกุลเป็นภาษาไทย"));
      } else {
        callback();
      }
    };
    return {
      optionGender: [
        {
          value: 1,
          label: "ชาย",
        },
        {
          value: 2,
          label: "หญิง",
        },
      ],
      formValidate: {
        fName: "",
        lName: "",
        email: "",
        password: "",
        verifyPassword: "",
        gender: "",
      },
      rules: {
        fName: [
          {
            required: true,
            message: "กรุณากรอกชื่อจริง",
            trigger: ["blur", "change"],
          },
          { validator: validateThaiFname, trigger: ["blur", "change"] },
        ],
        lName: [
          {
            required: true,
            message: "กรุณากรอกนามสกุล",
            trigger: ["blur", "change"],
          },
          { validator: validateThaiLname, trigger: ["blur", "change"] },
        ],
        email: [
          {
            required: true,
            message: "กรุณากรอกอีเมล",
            trigger: "blur",
          },
          {
            type: "email",
            message: "กรุณากรอกอีเมลให้ถูกต้อง",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            validator: validatePass,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        verifyPassword: [
          {
            validator: validatePass2,
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        gender: [
          {
            required: true,
            message: "กรุณาเลือกเพศ",
            trigger: "change",
          },
        ],
      },
      showDetail: false,
    };
  },
  methods: {
    returnGender(gender) {
      let result = this.optionGender.find((row) => row.value == gender);
      return result.label;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showDetail = true;
          this.$message({
            message: "บันทึกข้อมูล สำเร็จ",
            type: "success",
            duration: 4000,
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.showDetail = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>
