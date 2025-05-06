from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        op = request.form.get('op')
        num1 = float(request.form.get('num1'))
        num2 = float(request.form.get('num2'))
        result = data_processing_function(op, num1, num2)
        return render_template('index.html', result=result)
    return render_template('index.html')  # Trả về giao diện HTML

def data_processing_function(op, num1, num2):
    try:
        if num1 == int(num1): # Nếu num1 là số nguyên
            num1 = int(num1)
        if num2 == int(num2): # Nếu num2 là số nguyên
            num2 = int(num2)
        
        if op == '+':
            result = num1 + num2
        elif op == '-':
            result = num1 - num2
        elif op == '*':
            result = num1 * num2
        elif op == '/':
            if num2 == 0:
                return "Error: Division by zero"
            result = num1 / num2
        else:
            return "Error: Invalid operation"        
        return f"{num1} {op} {num2} = {result}"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
