<template>
  <DefaultTemplate>
    <div class="content">
      <div id="function-page">
        <h2 class="mg-0 text-center color-main">Test Function 1</h2>
        <pre>
        {{ productTotal }}
        </pre>
      </div>
    </div>
  </DefaultTemplate>
</template>

<script>
import DefaultTemplate from "@/template/DefaultTemplate";
import { examData } from "@/service/exam-data.json";

export default {
  components: {
    DefaultTemplate,
  },
  data() {
    return {
      examData: examData,
      productTotal:null
    };
  },
  mounted() {
    this.fetchTotalProduct();
  },
  methods: {
    fetchTotalProduct() {
      const product = this.examData.reduce((result, f) => {
        if (f.is_editable_price == false) {
          const obj = {
            name: f.name,
            totalSubProductWeight: f.products
              .map((item) => item.weight)
              .reduce((prev, next) => prev + next),
          };
          result.push(obj);
        }
        return result;
      }, []);
     this.productTotal=product
    },
  },
};
</script>
