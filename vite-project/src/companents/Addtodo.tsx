import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case "Set__Input_Value":
            return { ...state, inputValue: action.payload }
        case "ADD__todo":
            return { ...state, todos: [...state.todos, action.payload] }
        case "Clear__Input":
            return { ...state, inputValue: "" }
        case "delete__Todo":
            return { ...state, todos: state.todos.filter((q) => q.id !== action.payload) }
        case "Toogle__todo": {
            const found = state.todos.find((q) => q.id === action.payload);
            if (found) {
                found.isCompleted = !found.isCompleted; 
            }
            return { ...state, todos: [...state.todos] };
        }
        default:
            return state;
    }
}

const initialState = { todos: [], inputValue: "" }

const AddTodo = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div style={{ width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <input
                type="text"
                value={state.inputValue}
                style={{ width: "400px", height: "35px" }}
                placeholder='Add todo'
                onChange={(e) => dispatch({ type: "Set__Input_Value", payload: e.target.value })}
            />
            <button
                className='btn btn-info'
                style={{ marginTop: "30px" }}
                onClick={() => {
                    dispatch({
                        type: "ADD__todo",
                        payload: { id: new Date().toISOString(), todoText: state.inputValue, isCompleted: false }
                    });
                    dispatch({ type: "Clear__Input" })
                }}
                disabled={!state.inputValue.trim()} 
            >
                Əlavə et
            </button>
            <hr />
            {state.todos.length > 0 ? (
                <ul style={{ padding: 0, listStyle: "none" }}>
                    {state.todos.map((i) => (
                        <li key={i.id} style={{ textDecoration: i.isCompleted ? "line-through" : "", display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                onChange={() => {
                                    dispatch({ type: "Toogle__todo", payload: i.id })
                                }}
                                checked={i.isCompleted}
                                style={{ marginRight: "10px" }}
                            />
                            {i.todoText}
                            <button
                                className='btn btn-danger btn-sm'
                                style={{ marginLeft: "10px" }}
                                onClick={() => {
                                    if (window.confirm("Are you sure?")) {
                                        dispatch({ type: "delete__Todo", payload: i.id })
                                    }
                                }}
                            >
                                Sil
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                "There are no todos yet ..."
            )}
        </div>
    );
};

export default AddTodo;
