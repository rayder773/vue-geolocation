<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-wrapper">
        <form @submit.prevent="submit">
          <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
            <label class="form__label">Name</label>
            <input class="form__input" v-model.trim="$v.name.$model"/>
          </div>
          <div class="error" v-if="!$v.name.required">Name is required</div>
          <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
          <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { required, minLength } from 'vuelidate/lib/validators'


export default {
  name: "DashBoard",
  props: {
    msg: String
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`
      query {
        ipAddress(address: "189.59.228.170") {
          city {
            name
          }
        }
      }
    `
  },
  data() {
    return {
      name: '',
      age: 0,
      submitStatus: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .dashboard-wrapper {
    background: #FFFFFF;
    box-shadow: 0px 0px 50px rgba(230, 230, 230, 0.8);
    min-height: 619px;
    width: 936px;
    margin: 57px auto 0;
    padding: 48px;
  }
</style>
