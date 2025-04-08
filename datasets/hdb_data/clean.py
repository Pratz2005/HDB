file_path = 'ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# only keep data from 2024 onwards
remaining = lines[169151:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(remaining)