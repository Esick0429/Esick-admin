import { ref, onMounted } from "vue";
type OptionValueType = string | number;
interface getTableTypes {
  currentPage: OptionValueType;
  pageSize: OptionValueType;
  tagId?: OptionValueType;
  startTime: OptionValueType;
  endTime: OptionValueType;
}

interface IApiData {
  code: number;
  data: { total: number; list: [] };
  message: string;
}

/** 入参格式，暂时只需要传递 api 函数即可 */
interface IFetchSelectProps {
  api: () => Promise<IApiData>;
}

export function useFetchSelect(props: IFetchSelectProps) {
  const { api } = props

  const loading = ref<boolean>(false)
  const options = ref<getTableTypes>({})
  const value = ref<OptionValueType>("")

  /** 调用接口获取数据 */
  const loadData = () => {
    loading.value = true
    options.value = []
    api()
      .then((res) => {
        options.value = res.data
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    loadData()
  })

  return {
    loading,
    options,
    value
  }
}
