<template lang="pug">
    section.components-container
        .w-100.bg-white.p-4
            .pf-title.pb-3 {{title}}
            el-form(:model='domain', :rules='rule', ref='form' label-width='180px')
                el-form-item(label='项目名称:', prop='name' )
                    el-input.w-50(v-model='domain.name',  placeholder="请输入项目名称")
                el-form-item(label='主标题:', prop='address')
                    el-input.w-50(v-model='domain.title',  placeholder="请输入主标题名称")
                el-form-item(label='副标题:', prop='type')
                    el-input.w-50(v-model='domain.subTitle',  placeholder="请输入副标题名称")
                el-form-item(label='项目序号:', prop='no')
                  el-input.w-50(v-model='domain.no',  placeholder="请输入项目编号")
                el-form-item(label='项目类型:', prop='kind')
                  el-select(placeholder='项目类型', v-model='domain.kind')
                    el-option(:label='p.label', :value='p.value', v-for='p in types', :key='p.value') {{ p.label }}
                el-form-item(label='项目简介:', prop='description')
                    el-input.w-50(v-model='domain.content', type='textarea' :rows='5' placeholder="")
                el-form-item(label='项目图片:', prop='priority')
                    el-upload(:action="uploadPath" list-type="picture-card" :file-list="fileList" :show-file-list="true" :on-preview="handlePreview" :on-change="handleChange" style='width: 490px;height:180px;')
            .col-12.mb-4.text-center.w-50
                el-button(type='primary', @click='handleSave') 保存
                el-button(size='middle', @click='handleCancel') 取消
            el-dialog(:visible.sync='previewVisible' :modal-append-to-body="false")
                img(width='100%', :src='previewImage', alt='')
</template>

<script>
import API from "@/api/api";
import { regionData } from "element-china-area-data";
export default {
  name: "ResumeForm",
  data() {
    return {
      traderTags: [],
      types: [
        { value: "A", label: "web项目" },
        { value: "B", label: "小程序项目" },
        { value: "C", label: "个人项目" }
      ],
      selectedOptions: [],
      regionData: regionData,
      previewImage: "",
      domain: { type: [] },
      fileList: [],
      uploadPath: "http://127.0.0.1:3001/api/v1/file",
      title: "添加项目",
      id: "",
      imagePath: [],
      previewVisible: false,
      rule: {}
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList;
      if (file.status === "success") {
        let res = file.response;
        this.imagePath.push(res.prefixUri + res.relativePath);
      }
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    loadPartner() {
      API.project
        .get(this.id)
        .then(res => {
          this.domain = res.data;
          if (res.data.coverImage) {
            let image = {
              uid: "-1",
              name: "xxx.png",
              status: "done",
              url: res.data.coverImage,
              thumbUrl: res.data.coverImage
            };
            this.fileList.push(image);
          }
        })
        .catch(() => {});
    },
    handleSave() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        this.domain.coverImage = this.imagePath[0];
        var api = this.domain.id ? API.project.update : API.project.create;
        api(this.domain)
          .then(res => {
            // this.domain = res.data
            this.$message.success("保存成功!");
            this.$router.replace("/project/home");
          })
          .catch(() => {
            this.$message.error("保存失败!");
          });
      });
    },
    handleCancel() {
      this.$router.push("/project/home");
    },
    reback(data, text) {
      //switch 不行
      if (text === "traderTag") {
        this.traderTags = data;
      }
    }
  },
  mounted() {
    // dict.filterDict("traderTag", this.reback);
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      if (this.id !== "") {
        this.loadPartner();
      }
    }
  }
};
</script>

<style scoped>
</style>
