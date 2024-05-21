import toast from "react-hot-toast";


export const removeFromAPI = async (id) =>{
    try {
        const response = await fetch (`https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense/${id}.json`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
            const err = await response.json();
            throw new Error(err)
        }
        toast.success('Transaction Deleted!')
      } catch (error) {
        toast.error(error.message) 
      }
}

export const updateExpenseHandler = async (item, id) =>{
  console.log(item);
  try {
    const response = await fetch(
      `https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/${id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
        },
        
      }
    );
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    const data = await response.json();
    toast.success('Transaction updated!')
    return {...item, id}
  } catch (error) {
    toast.error('Error updating data:', error.message);
  }
}
