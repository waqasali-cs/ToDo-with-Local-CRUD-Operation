
import './App.css'
import Header from './components/header'
import Content from './components/Content';
import Footer from './components/Footer';
import {React,useEffect,useState} from 'react';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import apiRequest from './components/appRequest'

function App() {

  const API_URL = "http://localhost:3500/items";
  const [search,setSearch]=useState('')
  const [inputItem, setInputItem] = useState("");
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [isLoading,setIsLoading]=useState(true)
  
  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('did not receive expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      }catch (error) {
        setFetchError(error.message)
      }
      finally {
        setIsLoading(false)
      }
    }

    //simulating like fetching from real server
    setTimeout(() => {
      fetchItems()
    }, 2000);
  },[])

    const handleCheck = async (id) => {
      const listItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(listItems);

      //to update of database
      //get id of specific item whose checked is updated
      const myItem = listItems.filter((item) => item.id === id)
      //defining update object
      const updateOptions = {
        method: 'PATCH',
        header: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({checked:myItem[0].checked})
      }

      //defining url
      const reqUrl = `${API_URL}/${id}`
      
      //update expression function
      const result = await apiRequest(reqUrl, updateOptions)
      if (result) setFetchError(result)
    };
    
    const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);

      const deleteOptions = { method: "DELETE" }
      const reqUrl = `${API_URL}/${id}`
      const result = await apiRequest(reqUrl, deleteOptions)
      if (result) setFetchError(result)
    };
  
  const handleDeleteAll= () => {
    setItems([])
  }
    
    const addItem = async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = { id, checked: false, item }
      const listItems = [...items, myNewItem]
      setItems(listItems)

      const postOptions = {
        method: "POST",
        header: {
          'Content-Types':'application/json'
        },
        body:JSON.stringify(myNewItem),
      }

      const result = await apiRequest(API_URL, postOptions)
      if (!result) {
        setFetchError(result)
      }
    };
  

     const handleSubmit = (e) => {
       e.preventDefault();
       if (!inputItem) return;
       addItem(inputItem);
       setInputItem("");
     };

  return (
    <>
      <div className="App">
        <Header title="groceries list" />
        <SearchItem search={search} setSearch={setSearch} />
        <AddItem
          inputItem={inputItem}
          setInputItem={setInputItem}
          handleSubmit={handleSubmit}
        />
        <button className="deleteAll" onDoubleClick={handleDeleteAll}>
          Delete all
        </button>
        <main>
          {isLoading && <p>LOADING...</p>}
          {fetchError && (
            <p style={{ color: "red", fontSize: "2rem" }}>
              `ERROR: {fetchError}`
            </p>
          )}
          {!fetchError && !isLoading && (
            <Content
              items={
                search
                  ? items.filter((item) =>
                      item.item.toLowerCase().includes(search.toLowerCase())
                    )
                  : items
              }
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <Footer />
      </div>
      
    </>
  );
}

export default App
