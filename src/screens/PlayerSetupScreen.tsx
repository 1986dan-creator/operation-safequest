type PlayerSetupScreenProps = {
  playerName: string;
  selectedAvatar: string;
  availableAvatars: string[];
  isEditing: boolean;
  onNameChange: (name: string) => void;
  onAvatarChange: (avatar: string) => void;
  onSave: () => void;
};

export function PlayerSetupScreen({
  playerName,
  selectedAvatar,
  availableAvatars,
  isEditing,
  onNameChange,
  onAvatarChange,
  onSave,
}: PlayerSetupScreenProps) {
  return (
    <main className="setup-screen">
      <section className="setup-card">
        <p className="section-label">
          {isEditing ? "EDIT PLAYER" : "CREATE PLAYER"}
        </p>

        <h1>
          {isEditing
            ? "Update your SafeQuest profile"
            : "Build your SafeQuest profile"}
        </h1>

        <label htmlFor="player-name">What is your name?</label>
        <input
          id="player-name"
          value={playerName}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Enter your name"
        />

        <p className="choose-avatar-label">Choose your avatar</p>

        <div className="avatar-list">
          {availableAvatars.map((avatar) => (
            <button
              key={avatar}
              className={
                selectedAvatar === avatar
                  ? "avatar-choice selected-avatar"
                  : "avatar-choice"
              }
              onClick={() => onAvatarChange(avatar)}
            >
              {avatar}
            </button>
          ))}
        </div>

        <button className="next-button" onClick={onSave}>
          {isEditing ? "SAVE PROFILE ▶" : "CONTINUE ▶"}
        </button>
      </section>
    </main>
  );
}