import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import { PomoProvider } from "./context/PomoContext";
import { BoardsProvider } from "./context/BoardsContext";
import { NotesProvider } from "./context/NotesContext";
import { useAudio } from "./context/AudioContext";

const AppLayout = () => {
  const { audioRef } = useAudio();

  return (
    <BoardsProvider>
      <Header />
      <Navbar />

      <NotesProvider>
        <PomoProvider>
          <main className="col-start-2 row-start-2 h-full w-full overflow-y-auto dark:bg-neutral-800/70">
            <Outlet />

            {/* Sound Effect by <a href="https://pixabay.com/users/alex_jauk-16800354/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=199839">Alexander Jauk</a> from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=199839">Pixabay</a> */}
            <audio ref={audioRef} src="/bell-ring.mp3" />
          </main>
        </PomoProvider>
      </NotesProvider>

      <Toaster position="bottom-left" />
    </BoardsProvider>
  );
};

export default AppLayout;
