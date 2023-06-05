# Personal manager

### Описание
Приложение для управления кадрами, с помощью которого пользователь сможет быстро найти необходимую информацию о сотруднике и редактировать её,
кроме того пользователь сможет отфильтровать сотрудников по каким либо показателям

### Инструкция по сборке
npm install, 
ng serve, 
ng build --prod (когда будет закончена разработка приложения)


### Гит-флоу
<image src="./git-flow.jpg" alt="Git-flow"/>


### Формирование оценки

Общая оценка получается исходя из следующих 3 пунктов

1. **Техническая часть (максимум 60 баллов)**

    * **0 - 20:**
        - :white_check_mark: 2 - 3 реактивные формы
        - :white_check_mark: 2 - 3 функциональных модуля
        - :white_check_mark: Простое внедрение зависимостей
        - :white_check_mark: Использование @Input @Output
        - :white_check_mark: Базовое использование RxJS

    * **20 - 30:**
        - :white_check_mark: Reusable компоненты
        - :white_check_mark: Передача параметров в роуте
        - :white_check_mark: Использование Guards
        - :white_check_mark: Отсутствие any
        - :white_check_mark: 1-2 кастомная атрибутивная директива
        - :white_check_mark: 1-2 кастомных пайп
        - :white_check_mark: Использование общего code-style (настройка eslint)
        - :white_check_mark: Использование @ViewChild

    * **30 - 50:**
        - Продвинутое использование DI (использование токенов, useFactory)
        - :white_check_mark: Кастомная структурная директива
        - :white_check_mark: Обработка ошибок. Global error handler
        - :white_check_mark: Динамический рендер

    * **50 - 60:**
        - :white_check_mark: Адаптивность
        - Скелетоны
        - :white_check_mark: Анимации


2. **Оценка куратора (максимум 15 баллов)**
Куратор следит за исполнением вашего проекта и видит слаженность команды, настроенные процессы взаимодействия, код-ревью, настройку инфраструктуры. На свое усмотрение выставляет баллы.


3. **Оценка пользователя (максимум 25 баллов)**
Приложение будет оценено обычным пользователем. На его оценку влияет отзывчивость приложения, удобство использования, размер функциональности




### Примерный функционал (Управление кадрами)

Приложения представляет из себя систему управления кадрами. То есть администратор может видеть и управлять сотрудниками.

- Возможность просмотра списка пользователей (с пагинацией)
- Возможность фильтрации списка (по проекту, должности, заработной плате и тд)
- Возможность просмотра уволенных сотрудников
- Возможность просмотра конкретного сотрудника. Должна показываться ключевая информация (ФИО, дата рождения, образование и тд.). Также должна быть отображена история данного человек в компании: когда пришел на собеседование, когда приняли на работу, когда был первый рабочий день, отпуски, история заработной платы и тд.
- Возможность добавления сотрудника
- Градация сотрудников по успехам. Если сотрудник проходит повышение каждый раз - то он должен помечаться, как успешный сотрудник. Если же сотрудник долгое время не проходит повышение, то также должна быть отметка о данном сотруднике



### Требования

- Приложение должно быть написано с использованием Angular (version 14+)
- Использование дополнительных библиотек только при согласии куратора
- Демонстрация прогресса куратору каждую неделю в установленное время
- Если приложение будет задеплоено (можно без домена, без https), то вы получаете дополнительно 5 баллов


