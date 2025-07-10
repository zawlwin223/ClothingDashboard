export function paginate(data: any[], page: number, pageSize: number) {
  console.log('paginate', data)
  //   const pageSize = 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const totalPages = Math.ceil(data.length / pageSize)

  return [data.slice(startIndex, endIndex), totalPages]
}
