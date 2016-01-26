Pasii ce trebuie urmati ca sa facem push pe git (adica sa ducem fisierel modificat pe proiectul local in repositorul de pe git):

(toate comenzile vor fi executate in shell-ul de la git, in timp ce suntem in folder-ul cu proiectul)

#### INAINTE DE ORICE PUSH FACEM INTAI PULL, CA SA LUAM EVENTUALELE MODIFICARI DE LA CEILALTI ####

1. git status - verificam toate modificarile facute local. Vor aparea o serie de nume de fisiere cu rosu, acelea sunt fisierele modificare iar rosu inseamna ca nu am facut commit la ele. (Adica nu le-am pregatit pentru push)

2. git stash - salvam modificarile locale intr-un stash, de asemenea local, astfel incat cand facem pull sa nu suprascriem fisierele noastre.

3. git fetch origin master - facem fetch ( doar ia datele iar pull le suprascrie in fisier )

4. git pull origin master - facem pull din repositor, de pe branch-ul master. Asta inseamna ca downloadam toate fisierele adaugate de ceilalti de la ultimul nostru pull.

5. git stash pop - scoatem fisierele locale din stash si le reintroducem in proiectul local. Aici e momentul in care, daca doua persoane au modificat acelasi fisier, vor aparea conflicte ce vor fi aratate in consola git.

6. git add . - adaugam toate fisierele locale intr-un stash ce urmeaza sa fie comis? si apoi uploadat.

7. git status - inca o data, ca sa verificam daca toate fisierele au fost adaugate. Tot ce e cu verde inseamna ca e gata de dus sus, tot ce e cu rosu inca nu a fost adaugat si va trebui sa folosim:
	6.1 git add --all - sa adaugam fisierele indiferent de natura lor (new file, delete, change etc).

8. git commit -m "Un mesaj corespunzator" - adaugam fisierele salvate in stash cu git add in stash-ul de commit. Intre ghilimele o sa scriem, pe scurt, ce am adaugat, modificat etc.

9. git push origin master - facem push la fisierele din stash-ul de commit, le incarcam in repositorul de pe git.

Cel mai bine ar fi sa scriem aici de fiecare data cand facem commit la ce am lucrat, ca sa putem actualiza taskurile pe blogul ala sau ce spunea proful. Vad ca redmine nu prea functioneaza cum vreau eu, o sa caut altceva. Daca nu, facem o pagina simpla pentru taskuri.