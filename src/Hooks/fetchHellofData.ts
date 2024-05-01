import { useEffect, useState } from "react"
import { fetchPost } from "./api.hook"

export const useFetchHellofData = (query: string) => {
  const [data, setData] = useState<HFRecipe[]>([])

  useEffect(() => {
    const search = async () => {
      const response = await fetchPost("/recipes/hellof", { search: query })
      if (response.error) return

      let unique: HFRecipe[] = [
        ...new Map((response.data as HFRecipe[]).map((item: any) => [item['name'], item])).values()
      ]
      unique = unique.filter((x) => x.prepTime !== "PT0S")
      unique.sort((a: HFRecipe, b: HFRecipe) => b.averageRating - a.averageRating);

      setData(unique)
    }

    search()
  }, [query])

  return data
}