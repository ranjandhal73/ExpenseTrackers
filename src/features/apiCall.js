import toast from "react-hot-toast";

export const removeFromAPI = async (userId,id) =>{
  console.log(userId, id);
    try {
        const response = await fetch (`https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense/${userId}/${id}.json`,{
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

export const updateExpenseHandler = async (userId,item, id) =>{
  console.log(item, id);
  try {
    const response = await fetch(
      `https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense/${userId}/${id}.json`,
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
    console.log(data);
    toast.success('Transaction updated!')
    return {...item, id}
  } catch (error) {
    toast.error('Error updating data:', error.message);
  }
}

export const addUserHandler = async (userId,userData) =>{

  try {
    const response = await fetch(`https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersData/${userId}.json`,{
      method: 'PUT',
      body: JSON.stringify({userId, ...userData}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok){
      const err = await response.json();
      throw new Error(err)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
