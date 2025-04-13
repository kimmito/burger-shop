import React from "react";

class EditBurgerForm extends React.Component{
    handleChange = (event) => {
        const updatedBurger = {
            ...this.props.burger,
            [event.currentTarget.name]: event.currentTarget.value 
        }
        console.log(updatedBurger)
        this.props.updatedBurger(this.props.index, updatedBurger)
    }

    render(){
        return(
            <form className="burger-edit">
                <input onChange={this.handleChange} name="name" type="text" placeholder="Название" value={this.props.burger.name} autoComplete="off"/>
                <input onChange={this.handleChange} ref={this.priceRef} name="price" type="text" placeholder="Цена" value={this.props.burger.price} autoComplete="off"/>
                <select onChange={this.handleChange} ref={this.statusRef} name="status" className="status" value={this.props.burger.status}>
                    <option value="available">Доступно</option>
                    <option value="unavailable">Убрать из меню</option>
                </select>
                <textarea onChange={this.handleChange} ref={this.descRef} name="desc" placeholder="Описание" value={this.props.burger.desc}/>
                <input onChange={this.handleChange} ref={this.imageRef} name="image" type="text" placeholder="Изображение (ссылка)" autoComplete="off" value={this.props.burger.image}/>
                <button onClick={() => this.props.deleteBurger(this.props.index)}>Удалить из меню</button>
            </form>
        )
    }
}

export default EditBurgerForm;