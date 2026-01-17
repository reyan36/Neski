<a name="readme-top"></a>

<div align="center">

  <h1>Neski</h1>

  <h3>Connect Neighbors. Share Skills. Trade Time.</h3>

  <!-- Badges -->
  <p>
    <a href="https://github.com/username/neski/graphs/contributors">
      <img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge" alt="Version" />
    </a>
    <a href="https://www.solidjs.com/">
      <img src="https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=white" alt="SolidJS" />
    </a>
    <a href="https://supabase.com/">
      <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge" alt="License" />
    </a>
  </p>

  <br />

  <!-- Main Hero Image -->
  <img src="https://github.com/user-attachments/assets/c9932cd3-172a-49de-8746-69e7dc47389c" alt="Neski Dashboard" width="100%" />

</div>

<br />

## About The Project

**Neski** is designed to bring communities back together. In a digital age where we are connected globally but disconnected locally, Neski provides a trusted environment to find help, offer skills, and trade time with the people living right next door.

The platform leverages **Groq AI** to remove the friction of listing services intelligently matching needs with skills and helping users craft professional descriptions in seconds.

---

## Features

| Feature | Description |
| :--- | :--- |
|  **Live Neighborhood Map** | Interactive map powered by Leaflet to visualize services and volunteers in your specific neighborhood. |
|  **AI Recommendations** | The app learns your interests (e.g., "Gardening", "Tech") and uses **Groq AI (Llama 3)** to highlight the best listings for you. |
|  **Magic Wand Editor** | Creating a listing? Type a rough title and click the Magic Wand. Our AI writes a professional description for you instantly. |
|  **Responsive Design** | Fully optimized for desktop monitors, tablets, and mobile phones. |
|  **Secure Auth** | Robust authentication and data management handled via Supabase. |

---

## Gallery

<div align="center">
  <p><i>Snapshots of the Neski experience</i></p>
</div>

<!-- Gallery Table -->
<table>
  <tr>
    <td width="50%" align="center"><b>Live Map View</b></td>
    <td width="50%" align="center"><b>Listing Details</b></td>
  </tr>
  <tr>
    <td><img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/af806606-6a27-4d0b-9ddb-dd3b2dc0b543" />
</td>
    <td><img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/13fbb371-079b-420c-a2d3-58d39b3a0996" />

</td>
  </tr>
  <tr>
    <td align="center"><b>Login Interface</b></td>
    <td align="center"><b>Reviews</b></td>
  </tr>
  <tr>
    <td><img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/ff5578a1-ea71-4e78-8ad3-03d6d15b8e3c" />

</td>
    <td><img width="100%" height="100%" alt="image" src="https://github.com/user-attachments/assets/0d62e4b0-096b-46ce-810c-8726452cb770" />

</td>
  </tr>
</table>


---

## Technologies

The application is built using a modern, scalable, and performance-focused stack:

*   **Frontend:** ![SolidJS](https://img.shields.io/badge/SolidJS-2C4F7C?logo=solid&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
*   **Backend:** ![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)
*   **Database:** ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white) 
*   **AI Engine:** ![Groq](https://img.shields.io/badge/Groq_AI-f55036?logo=google&logoColor=white) 
*   **DevOps:** ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

---

## Setup

We use **Docker** to make the setup fast, consistent, and easy.

### Prerequisites
*   **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (Ensure it is running)
*   **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/neski.git
    cd neski
    ```

2.  **Configure Environment Variables**
    Navigate to the `backend/` folder and create a `.env` file.
    ```bash
    cd backend
    touch .env
    ```
    
3.  **Start the Application**
    Return to the root directory and run Docker Compose:
    ```bash
    cd ..
    docker compose up --build
    ```

4.  **Access the App**
    *   **Frontend:** [http://localhost:5173](http://localhost:5173)
    *   **Backend:** [http://localhost:3000](http://localhost:3000)

> **To Stop:** Press `Ctrl + C` in your terminal or run `docker compose down`.




## Developers

<p align="center">
    <a href="https://www.linkedin.com/in/reyan36/">
        <img src="https://img.shields.io/badge/Reyan_Arshad-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Reyan Arshad"/>
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/gevinm/">
        <img src="https://img.shields.io/badge/Gevin_Madharha-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Gevin Madharha"/>
    </a>
</p>




## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">Back To Top</a>)</p>


