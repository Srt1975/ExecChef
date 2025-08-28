
import tkinter as tk
from tkinter import ttk
from tkinter import Toplevel

# Add Window
def open_add_window():
    new_window = Toplevel(window)
    new_window.title("Add Recipe")
    new_window.geometry("500x500")
    label = tk.Label(new_window, text="Add your recipe here")
    label.pack(pady=20)
    recipe_name_entry = tk.Entry(new_window)
    recipe_name_entry.pack(pady=10)
    recipe_name_entry.insert(0, "Enter recipe name")
    ingredient_label = tk.Label(new_window, text="Ingredients:")
    ingredient_label.pack(pady=5)
    ingredient_entry = tk.Entry(new_window)
    ingredient_entry.pack(pady=5)
    ingredient_entry.insert(0, "Enter ingredients")
    instructions_label = tk.Label(new_window, text="Instructions:")
    instructions_label.pack(pady=5)
    instructions_entry = tk.Entry(new_window)
    instructions_entry.pack(pady=5)
    instructions_entry.insert(0, "Enter instructions")
    save_button = tk.Button(new_window, text="Save", command=lambda: print(f"Recipe '{ recipe_name_entry.get()}' saved!"))
    save_button.pack(pady=10)


def open_view_window():
    new_window = Toplevel(window)
    new_window.title("View Recipe")
    new_window.geometry("300x200")
    

window = tk.Tk()
window.title("Selection Window")
#window.geometry('300x250')

# Add a recipe
def add_recipe():
    print("Add Recipe Button Clicked")
    open_add_window() 
   

# Find a recipe
def view_recipe():
    open_view_window()
    print("Find Recipe Button Clicked") 

# Create Frame
frame = tk.Frame(window)
frame.pack(padx=50,pady=40)

# Create Labels
welcome_label = tk.Label(frame, text="Welcome to ExecChef", font=("Arial", 16))
welcome_label.grid(row=0, column=0, columnspan=2, pady=10)



# Create Buttons
categories_label = tk.Label(frame, text="Category select", width=15, height=2)
categories_label.grid(row=1, column=0, padx=10, pady=5)
categories = ttk.Combobox(frame, values=["Soups", "Sauces", "Salads", "Entrees", "Desserts"])
categories.current(3)  # Set default value
categories.grid(row=2, column=0, padx=5, pady=5)


add_recipies = tk.Button(frame, text="Add", width=15, height=2, command=add_recipe)
add_recipies.grid(row=3, column=0, padx=20, pady=20)

view_recipies = tk.Button(frame, text="View", width=15, height=2, command=view_recipe)
view_recipies.grid(row=4, column=0, padx=20, pady=20)





window.mainloop()