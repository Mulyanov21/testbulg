<template :key="marksAdd">
  <div class="container">
    <div class="card">
      <h1 v-if="!change" style="margin-bottom: -10px;">{{ mark.header }}</h1>
      <input v-else type="text" v-model="mark.header">
      <p v-if="!change" style=" font-size: 15px; color:#999999" @click="change = !change">изменить</p>
      <p v-else style=" font-size: 15px; color:#999999" @click="change = !change">сохранить</p>
      <div style="display: flex; flex-direction: row; justify-content: center; align-items: center"
           v-for="(elem, ind) in body" :key="ind">
        <input type="checkbox"
               :id='"idcheck"+ind'
               style="margin-right: 15px"
               v-model="elem.checked"
               >
        <input type="text" :for='"idtext"+ind' style="margin-right: 40px" v-model="elem.value">
        <p class='danger' @click="body.splice(ind,1)">Удалить</p>
      </div>
      <p class="primary pt-3" @click="body.push({'value': '', 'cheched':''})">Добавить элемент</p>
      <hr>
    </div>
    <confirm-window v-if="this.$store.state.showModal != 'false'" @close="confirm">
      <template v-slot:header>
        <h3 slot="header">Вы уверены?</h3>
      </template>
      <template v-slot:body>
        <p slot="body">Подтвердите действие</p>
      </template>
    </confirm-window>

    <button class="btn primary" @click="this.$store.state.showModal = 'trueSave'">Сохранить изменения</button>
    <button class="btn danger" @click="this.$store.state.showModal = 'trueBack'">Отменить изменения</button>
    <button class="btn" @click="this.$router.back()">Назад</button>
  </div>
</template>

<script>
import ConfirmWindow from "@/components/ConfirmWindow";
export default {
  name: 'MarkPage.vue',
  components: {ConfirmWindow},
  data: () => ({
    body: '',
    checked: [],
    ind: '',
    marks: {},
    change: false,
    showModal: false,
  }),
  props: [

  ],
  computed: {
  },
  methods: {
    confirm() {
      let showModal = this.$store.state.showModal
      if (showModal === "trueSave") this.saveChanges()
      else if (showModal === "trueBack") this.getData()
      this.$store.state.showModal = 'false'
    },
    saveChanges() {
      this.mark.checked = this.checked
      localStorage.setItem('marks', JSON.stringify(this.marks))
      this.$router.push('/')
    },
    getData() {
      this.marks = JSON.parse(localStorage.getItem('marks'))
      if (this.marks) {
        for (let mark of this.marks) {
          if (this.$route.params.id == mark.id) {
            this.mark = mark
            this.header = mark.header
            this.body = mark.body
            this.checked = mark.checked
            this.ind = mark.id
            console.log(this.ind)
          }
        }
      }
      console.log(this.marks)
    },
  },
  beforeMount() {
    this.getData()
  }
}
</script>

<style>

</style>
