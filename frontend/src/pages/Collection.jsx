import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'


const Collection = () => {

  const [showFilter, setShowFilter] = useState(false)
  const {products} = useContext(ShopContext)
  const [filterProducts,setFilterProducts] = useState([])
  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('relevant')

  const toggleCategory = (e)=>{

    if (category.includes(e.target.value)) {
        setCategory(prev => prev.filter(item => item != e.target.value))
    }else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item != e.target.value))
  }else{
    setSubCategory(prev => [...prev,e.target.value])
  }
  }

  const applyFilter =()=>{
    let productsCopy = products.slice()
    if (category.length > 0) {
        productsCopy = productsCopy.filter((item) =>  category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item)=> subCategory.includes(item.subCategory) )
    }

    setFilterProducts(productsCopy)


  }


  const sortProduct = ()=>{
    let filterProductCopy = filterProducts.slice()

    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(filterProductCopy.sort((a,b)=>(b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

useEffect(()=>{
  applyFilter()
  },[subCategory, category])

useEffect(()=>{
  sortProduct()
},[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
          <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex place-items-center cursor-pointer gap-2'>
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter? 'rotate-90' :''}`} src={assets.dropdown_icon}/>
          </p>
          {/* Category Filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input onChange={toggleCategory} type='checkbox' className='w-3' value={'Men'}/> Men
                </p>
                <p className='flex gap-2'>
                  <input onChange={toggleCategory} type='checkbox' className='w-3' value={'Women'}/> Women
                </p>
                <p className='flex gap-2'>
                  <input onChange={toggleCategory} type='checkbox' className='w-3' value={'Kids'}/> Kids
                </p>
              </div>
            </div>

            {/* Sub CAtegory Filter  */}

            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input onChange={toggleSubCategory} type='checkbox' className='w-3' value={'Topwear'}/> Topwear
                </p>
                <p className='flex gap-2'>
                  <input onChange={toggleSubCategory} type='checkbox' className='w-3' value={'Bottomwear'}/> Bottomwear
                </p>
                <p className='flex gap-2'>
                  <input onChange={toggleSubCategory} type='checkbox' className='w-3' value={'Winterwear'}/> Winterwear
                </p>
              </div>
            </div>

      </div>

      {/* Right Side  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevant'>Sort by : Relevant</option>
            <option value='low-high'>Sort by : Low to High</option>
            <option value='high-low'>Sort by : High to Low</option>

          </select>
        </div>

          {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                filterProducts.map((product,index)=>{
                  return(
                      <ProductItem key={index} id={product._id} name={product.name} price={product.price} image={product.image}/>
                  )
                })
            }
        </div>

      </div>
    </div>
  )
}

export default Collection
