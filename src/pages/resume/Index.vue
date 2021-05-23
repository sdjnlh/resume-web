<template lang="pug">
  html
    head
    body#page-top(data-spy='scroll', data-target='.navbar-fixed-top')
      header.intro
        .intro-body
          .container
            .row
              .intro-text
                h1 你好, 我是李皓
                p 后端工程师 & 大学本科（软件工程，统招，学信网可查）
                a.btn.btn-default.btn-lg.page-scroll(href='#about') 关于我
                a.btn.btn-default.btn-lg.page-scroll(href='#portfolio') 我的项目经验
      // Navigation
      #nav
        nav.navbar.navbar-custom
          .container
            .navbar-header
              button.navbar-toggle(type='button', data-toggle='collapse', data-target='.navbar-main-collapse')
                i.fa.fa-bars
              a.navbar-brand.page-scroll(href='#page-top') 李皓
            // Collect the nav links, forms, and other content for toggling
            .collapse.navbar-collapse.navbar-right.navbar-main-collapse
              ul.nav.navbar-nav
                // Hidden li included to remove active class from about link when scrolled up past about section
                li.hidden
                  a(href='#page-top')
                li
                  a.page-scroll(href='#about') 关于我
                li
                  a.page-scroll(href='#services') 知识技能
                li
                  a.page-scroll(href='#portfolio') 项目经验
                li
                  a.page-scroll(href='#resume') 工作经验
                li
                  a.page-scroll(href='#achievements') 业余工作
                li
                  a.page-scroll(href='#testimonials') 自我介绍
                li
                  a.page-scroll(href='#contact') 联系我
      // About Section
      #about
        .container
          .section-title.text-center.center
            h2 关于我
            hr
          .row
            .col-md-12.text-center
              img.img-responsive(src='../../img/graduation-logo.jpg')
            .col-md-8.col-md-offset-2
              .about-text
                p
                  | 你好，我一八年毕业，一七年九月份开始在山东国子软件股份有限公司实习，主要工作是一些OA系统和档案系统的研发。
                p
                  | 一九年初辞去济南的工作，来到上海入职一家创业公司，开启沪漂之路。
                p.text-center
                  a.btn.btn-success(:href='dynamicBase + "v1/resumes/download"', target='_blank')
                    i.fa.fa-download
                    |  简历下载
                  a.btn.btn-primary.ml-3(:href='dynamicBase + "v1/resumes/view"', target='_blank')
                    i.fa.el-icon-view
                    |  简历预览
      // Services Section
      #services.text-center
        .container
          .section-title.center
            h2 知识技能
            hr
          .space
          .row
            .col-md-3.col-sm-6.service
              i.fa.fa-laptop
              h4 Vue
              p
                |  熟练使用Vue脚手手架，js类库。Element 框架
            .col-md-3.col-sm-6.service
              i.fa.fa-code
              h4 微信小程序
              p
                | 使用vant框架，搭建小程序，熟悉微信提供接口，对接小程序平台接口，例如支付，登录，获取位置。获取手机号。等等
            .col-md-3.col-sm-6.service
              i.fa.fa-rocket
              h4 Golang
              p
                | 入职公司后百分之八十项目后台由golang搭建，熟悉xorm框架，gin框架，及templateHtml渲染
            .col-md-3.col-sm-6.service
              i.fa.fa-bullhorn
              h4 Java
              p
                | 本命语言之一，熟悉springboot框架，持久层框架MyBatis，Java基础.
      // Portfolio Section
      #portfolio
        .container
          .section-title.text-center.center
            h2 我的项目经验
            hr
            .clearfix
            p
              | 项目经验从2017年实习开始，至今共参与大大小小数十个项目代表性项目如下
          .categories
            ul.cat
              li
                ol.type
                  li
                    a(@click="loadProjects('')") 所有
                  li
                    a(@click="loadProjects('A')") web项目
                  li
                    a(@click="loadProjects('B')") 小程序项目
                  li
                    a(@click="loadProjects('D')") 个人项目
            .clearfix
          .row
            .portfolio-items
              .col-sm-6.col-md-3.col-lg-3.web(v-for="project in projects")
                .portfolio-item
                  .hover-bg
                    a(:href='project.coverImage', title='Project description', rel='prettyPhoto')
                        .hover-text
                            h4 {{project.name}}
                            small {{project.title}}
                            .clearfix
                            i.fa.fa-search
                        img.img-responsive(:src='project.coverImage', :alt='projects.title')
      // Skills Section
      //#skills.text-center
        .container
          .section-title.center
            h2 My Skills
            hr
          .row
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='95')
                span.percent 95
              h4 HTML5
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='85')
                span.percent 85
              h4 CSS3
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='80')
                span.percent 80
              h4 jQuery
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='80')
                span.percent 80
              h4 WordPress
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='70')
                span.percent 70
              h4 Photoshop
            .col-md-4.col-sm-6.skill
              span.chart(data-percent='65')
                span.percent 65
              h4 Illustrator
      // Resume Section
      #resume.text-center
        .container
          .section-title.center
            h2 工作经历
            hr
          .row
            .col-lg-12
              ul.timeline
                li
                  .timeline-image
                    h4
                      | 2017-09
                      br
                      |                 -
                      br
                      |                 2019-03
                  .timeline-panel
                    .timeline-heading
                      h4 山东国子软件股份有限公司
                      h4.subheading 实习生
                    .timeline-body
                      p
                        | 负责OA系统研发，后期参与过档案系统研发，使用Activity工作流，控制节点走向和审核节点及角色。
                li.timeline-inverted
                  .timeline-image
                    h4
                      | 2019-4
                      br
                      |                 -
                      br
                      |                 至今
                  .timeline-panel
                    .timeline-heading
                      h4 上海育研信息科技有限公司
                      h4.subheading Golang后端开发工程师
                    .timeline-body
                      p
                        | 创业公司，公司发展方向为物联网，因此项目经验中有部分项目为物联网项目，其他项目为外包项目
        .container
          .section-title.center
            h2 教育
            hr
          .row
            .col-lg-12
              ul.timeline
                // Education Section
                li
                  .timeline-image
                    h4
                      | 2014
                      br
                      |                 -
                      br
                      |                 2018
                  .timeline-panel
                    .timeline-heading
                      h4 泰山学院
                      h4.subheading 软件工程
                    .timeline-body
                      p
                        |  泰山学院信息科技学院。
                li.timeline-inverted
                  .timeline-image
                    h4
                      | 2017-06
                      br
                      |                 -
                      br
                      |                 2017-09
                  .timeline-panel
                    .timeline-heading
                      h4 山东师创培训学习
                      h4.subheading 软件开发
                    .timeline-body
                      p
                        | 复习java基础，sql基础，spring框架，spring-boot框架，js基础等。
      // Achievements Section
      #achievements.section.dark-bg
        .container
          .section-title.center.text-center
            h2 我的github/代码库
            hr
          .row
            .col-md-6.col-sm-3
              .achievement-box
                i.fa.fa-code
                span.count
                  a.count(href="https://github.com/sdjnlh/",target='_black') github
                span
                  h6 https://github.com/sdjnlh/
            .col-md-6.col-sm-3
              .achievement-box
                  i.fa.fa-code
                  span.count
                    a.count(href="http://code.lncios.cn/",target='_black') 个人代码库
                  span
                    h6 http://code.lncios.cn
      // Testimonials Section
      #testimonials.text-center
        .container
          .section-title.center
            h2 自我介绍
            hr
          //.row
            el-carousel(interval="4000",type="card" height="400px")
              el-carousel-item(v-for='item in pics',:key='item.url')
                img(:src='item.url')
      // Contact Section
      #contact.text-center
        .container
          .section-title.center
            h2 联系我
            hr
            p
              | 谢谢您看到了这里，如有意向请打电话给我，或者留言，本人将第一时间回复
          .col-md-8.col-md-offset-2
            .col-md-3
              i.fa.fa-map-marker.fa-2x
              p
                | 上海市闵行区古美西路899弄
                br
                |           鸿发家园
            .col-md-3
              i.fa.fa-envelope-o.fa-2x
              p jnsdlh@outlook.com
            .col-md-3
              i.fa.fa-phone.fa-2x
              p  15853196797
            .col-md-3
              i.fa.fa-wechat.fa-2x
              p  LH55954
            hr
            .clearfix
          .col-md-8.col-md-offset-2
            h3 发消息联系我(本消息直接发短息给我对接阿里大于)
            form#contactForm(name='sentMessage', novalidate='')
              .row
                .col-md-6
                  .form-group
                    input#name.form-control(type='text', placeholder='贵公司', required='required')
                    p.help-block.text-danger
                .col-md-6
                  .form-group
                    input#email.form-control(type='email', placeholder='邮箱', required='required')
                    p.help-block.text-danger
              .form-group
                textarea#message.form-control(name='message', rows='4', placeholder='信息', required='')
                p.help-block.text-danger
              #success
              button.btn.btn-default(type='submit') 发送
      #footer
        .container.text-center
          .fnav
            p
              | 鲁ICP备 20010502号


</template>

<script>
import API from '@/api/api'
export default {
  name: "Index",
  data() {
    return {
      dynamicBase: process.env.VUE_APP_API_BASE,
      pics: [
        {url: require("../../img/graduation-logo.jpg")},
        {url: require("../../img/index-logo.jpg")},
        {url: require("../../img/index-logo-2.jpg")},
        {url: require("../../img/frist.jpg")}
      ],
      projects: [],
      filter: {
        k: ''
      }
    }
  },
  created() {},
  methods: {
    loadProjects(all) {
      this.projects = []
      this.filter.k = all
      API.project
          .list(this.filter)
          .then(res => {
            this.projects = res.data.data
            this.listLoading = true
          })
          .catch(function () {
          })
    }
  },
  mounted() {
    this.loadProjects()
  }
};
</script>

<style scoped>
</style>
