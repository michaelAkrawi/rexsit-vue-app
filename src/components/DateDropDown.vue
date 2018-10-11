<template>
    <div class="row">
        <div class="col-4">                                                        
            <select id="drop-down-day" class="form-control" v-model="day" @input="updateSelectedDay" >
                <option value="0">{{$t("day")}}</option>
                <option v-for="d in getDays" :value="d">{{d}}</option>
            </select>                            
        </div>
        <div class="col-4">                                                        
            <select id="drop-down-month" class="form-control" v-model="month" @change="fillDays" @input="updateSelectedMonth" >
                <option value="0">{{$t("month")}}</option>
                <option value="1"> {{$t("monthList.january")}} </option>
                <option value="2">{{$t("monthList.february")}}</option>
                <option value="3">{{$t("monthList.march")}}</option>
                <option value="4">{{$t("monthList.april")}}</option>
                <option value="5">{{$t("monthList.may")}}</option>
                <option value="6">{{$t("monthList.june")}}</option>
                <option value="7">{{$t("monthList.july")}}</option>
                <option value="8">{{$t("monthList.august")}}</option>
                <option value="9">{{$t("monthList.september")}}</option>
                <option value="10">{{$t("monthList.october")}}</option>
                <option value="11">{{$t("monthList.november")}}</option>
                <option value="12">{{$t("monthList.december")}}</option>
            </select>                            
        </div>
        <div class="col-4">                                                        
            <select id="drop-down-year" class="form-control" v-model="year" @input="updateSelectedYear" >
                <option value="0">{{$t("year")}}</option>
                <option v-for="y in getYears" :value="y"> {{y}} </option>
            </select>                            
        </div>
    </div>
</template>

<style scoped>
</style>


<script>
export default {
  name: "date-drop-down",
  data() {
    return {
      year: 0,
      month: 0,
      day: 0
    };
  },
  props: ["value", "selectedDate"],
  computed: {
    getDays() {
      return new Date(this.year, this.month, 0).getDate();
    },
    getYears() {
      const arr = [];
      for (var j = 1900; j <= new Date().getFullYear(); j++) {
        arr.push(j);
      }
      return arr;
    }
  },
  methods: {
    fillDays() {
      this.getDays;
    },
    updateSelectedYear(event) {
      this.year = event.target.value;
      this.emitDateEvent();
    },
    updateSelectedMonth(event) {
      this.month = event.target.value;
      this.emitDateEvent();
    },
    updateSelectedDay(event) {
      this.day = event.target.value;
      this.emitDateEvent();
    },
    emitDateEvent() {
      if (this.year > 0 && this.month > 0 && this.day > 0) {
        debugger;
        let dateObj = new Date(`${this.year}-${this.month}-${this.day}`);
        let date = dateObj.toDateString();
        this.$emit("input", date);
      }
    }
  },
  watch: {
    selectedDate : function(){
      let date = new Date(this.selectedDate);
      this.day = date.getDate();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
    }
  },

  mounted() {
  
  }
};
</script>

