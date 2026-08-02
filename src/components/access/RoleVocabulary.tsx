type RoleVocabularyProps = {
  label: string;
  roles: readonly string[];
};

export function RoleVocabulary({ label, roles }: RoleVocabularyProps) {
  return (
    <section className="access-roles" aria-labelledby="access-role-vocabulary">
      <h2 id="access-role-vocabulary">{label}</h2>
      <ul>
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </section>
  );
}
