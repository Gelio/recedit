# Projekt 1 z Grafiki komputerowej

Autor: Grzegorz Rozdzialik
Grupa poniedziałkowa, 13-15

Edytor wielokątów z możliwością ustawienia relacji krawędzi:
* pozioma
* pionowa
* o określonej długości


## Klawiszologia

Wierzchołki dodajemy klikając na wolny kawałek obszaru w ramce (canvas).
Aby zamknąć wielokąt należy kliknąć w wierzchołek, z którego zaczęliśmy tworzenie nowego wielokąta.

Wierzchołki możemy przesuwać klikając w nie i przeciągając myszką.

Wierzchołki możemy usuwać klikając w nie podwójnie. Nie można zejść poniżej 3 wierzchołków, czyli
figurą o minimalnej ilości wierzchołków, która jest dopuszczalna w projekcie jest trójkąt.
Usunięcie wierzchołka powoduje usunięcie relacji na krawędziach wychodzących z tego wierzchołka.

Wierzchołki możemy dodawać klikając podwójnie w okolicy danej krawędzi. Wierzchołek zostanie dodany
w środku wybranej krawędzi. Nie można dodawać wierzchołka w środku krawędzi, która aktualnie ma
relację. Przed dodaniem należy usunąć tą relację.

Relacje możemy dodawać klikając na krawędzi, a następnie klikając na odpowiedni przycisk relacji.
Relacje pozioma (_Horizontal_) i pionowa (_Vertical_) nie wymagają żadnych dodatkowych danych.
Relacja określonej długości (_Fixed length_) wymaga wprowadzenia zadanej długości w okienku
dialogowym, które wyświetla się po naciśnięciu przycisku.

Relacje pionowa i pozioma można ustawić na krawędziach, które są odpowiednio prawie pionowe lub poziome
(tolerancja 20 stopni).

Relacje możemy usuwać klikając na krawędź, której dotyczy relacja, a następnie klikając na podświetlony
przycisk odpowiadający aktywnej relacji.

Etykieta relacji znajduje się na obok środka krawędzi, na której relacja jest zdefiniowana.

Przy poruszaniu wierzchołkiem wszystkie relacje zostają zachowane.

Klawiszem _Escape_ możemy anulować dodawanie nowego wielokąta, o ile nie został on już zamknięty.

Przytrzymanie klawisza _Ctrl_ pozwala ruszać całym wielokątem.


## Przyjęte założenia

1. Może istnieć wiele wielokątów jednocześnie.
2. Model matematyczny relacji i wielokątów jest oddzielony od logiki wyświetlania.
3. Po dodaniu wielokąta nie można go usunąc w całości. Można jedynie go zredukować do trójkąta
    lub odświeżyć stronę w celu wyczyszczenia planszy.
4. Może być wiele warstw do rysowania. W moim wykorzystaniu jedna zawiera pełne wielokąty, a druga
    nowo tworzone ścieżki.
5. Bardzo łatwe jest dodanie nowych rodzajów relacji, o ile są to relacje działające jedynie na
    jednej krawędzi. Przykładem może tu być relacja krawędzi diagonalnej.
6. Przy dowolnej zmianie przerysowywane są wszystkie linie między wierzchołkami.
7. Aplikacja używa własnego systemu zdarzeń do logiki związanej z wielokątami,
    oraz natywnych zdarzeń przeglądarkowych do interfejsu użytkownika.
8. Elementy interfejsu użytkownika, np. wierzchołki wielokątów albo popup z listą relacji
    są zwykłymi elementami w HTMLu. Nie są rysowane przez aplikację.
9. Aplikacja stworzona jest w języku _Typescript_. Jest to rozszerzenie języka _Javascript_, które
    zawiera typy zmiennych. Znacznie ułatwia to pracę w tym języku i zmniejsza ilość błędu.

    Jednakże, Typescript nie jest domyślnie interpretowany przez przeglądarkę, dlatego musi zostać
    transpilowany do Javascriptu.

    Instrukcja znajduje się w pliku `README.md`, natomiast w folderze
    `dist` załączam wersję ztranspilowaną, którą może otworzyć przeglądarka.

10. Do wyświetlenia elementów HTMLa zostały użyte tzw. _Custom elements_, które nie są domyślnie
    wspierane przez przeglądarki inne, niż Google Chrome. Został dołączony _polyfill_, który
    powinien sprawić, że w innych przeglądarkach aplikacja również będzie działała,
    jednakże nie mogę zagwarantować, że tak w istocie będzie.

    W przypadku, gdy aplikacja nie działa poprawnie, proszę spróbować uruchomić ją w Google Chrome.

11. Do najbardziej wrażliwych i fundamentalnych elementów aplikacji stworzyłem testy jednostkowe.

    Sposób ich uruchomienia został opisany w `README.md`.

12. Po wstawieniu nowego wierzchołka na środku krawędzi, która ma zdefiniowaną relację,
    relacja jest usuwana.


## Implementacja algorytmu relacji

Relacja jest obiektem klasy implementującej następujący interfejs:
``` typescript
interface LineCondition {
  line: Line;
  polygon: Polygon;

  isMet(): boolean;
  fix(lockedPoint: Point);
  duplicateForNewLine(line: Line, polygon: Polygon): LineCondition;
  verifyCanBeApplied();
  getLabel();
}
```

Każdy typ relacji jest oddzielną klasą, która implementuje po swojemu metody z interfejsu.

Omówienie metod:
* `isMet` sprawdza, czy relacja zdefiniowana na linii `line` jest aktualnie spełniona
* `fix` _naprawia_ relację honorując punkt zablokowany, czyli taki, który nie zostanie przesunięty
  podczas naprawiania.
* `duplicateForNewLine` tworzy kopię aktualnej relacji dla nowej linii w nowym wielokącie
* `verifyCanBeApplied` sprawdza, czy linia jest w granicy tolerancji dla tej relacji (dla relacji
  poziomej i pionowej jest to sprawdzenie, czy odchylenie jest mniejsze niż 20 stopni)
* `getLabel` zwraca etykietę, która powinna zostać wyświetlona w interfejsie użytkownika

Klasa `Polygon` zawiera wielokąt jako listę punktów, a relacje jako listę obiektów typu `LineCondition`.


### Algorytm poprawiania relacji

Wybieramy wierzchołek od którego, od którego zaczynamy poprawianie. Następnie zwiększając
indeks aktualnie rozpatrywanego wierzchołka sprawdzamy, czy na aktualnej linii jest zdefiniowana
pewna relacja. Jeżeli jest, to sprawdzamy czy jest spełniona. Jeżeli nie jest, to poprawiamy,
uznając wierzchołek, do którego dotarliśmy wcześniej, jako ten, który ma zostać zablokowany.

Dzięki temu unikamy wielokrotnego poprawiania tego samego punktu.
Po poprawieniu relacji mamy pewność, że jest spełniona. Wtedy rozpatrujemy następną krawędź.

Robimy tak, aż trafimy na krawędź, która nie ma relacji, lub jej relacja jest spełniona, lub
dotarliśmy do wierzchołka startowego.

Jeżeli dotarliśmy do wierzchołka startowego to oznacza, że nie da się poprawić relacji.

W przeciwnym wypadku w tą stronę udało się poprawić relacje. Oznaczmy przez v wierzchołek, który
jako ostatni został uznany za zablokowany przy poprawianiu relacji.

Następnie zaczynamy sprawdzanie od wierzchołka początkowego zmniejszając indeks aktualnie
rozpatrywanego wierzchołka (idziemy w drugą stronę). Ponawiamy poruszanie się o 1 krawędź,
sprawdzanie relacji i jej naprawianie do momentu, gdy dotrzemy do wierzchołka v lub trafimy na
krawędź, która nie ma relacji lub jej relacja jest spełniona.

Jeżeli dotarliśmy do wierzchołka v i krawędź ma relację, która nie jest spełniona, to w ogólności
nie da się poprawić relacji.

W przciwnym wypadku udało się naprawić relacje.


### Zachowanie relacji podczas dodawania nowej relacji

Przy dodawaniu nowej relacji najpierw sprawdzamy metodą `verifyCanBeApplied` czy są spełnione
warunki początkowe. Jeżeli tak, to dodajemy ją i wykonujemy algorytm poprawiania relacji
zaczynając od jednego z wierzchołków krawędzi, do której dodajemy relacje.

Jeżeli nie udało się naprawić wielokąta, to wykonujemy algorytm poprawiania relacji zaczynając
od drugiego z wierzchołków krawędzi, do której dodajemy relację.

Jeżeli w tym przypadku również nie udało się naprawić wielokąta, to relację usuwamy i zwracamy
informację, że nie da się dodać tej relacji.

### Zachowanie relacji podczas przesuwania wierzchołka

Przy każdorazowym przesunięciu wierzchołka wykonujemy algorytm poprawiania relacji zaczynając
z tego wierzchołka, który został przesunięty.

Jeżeli w obie strony nie da się naprawić relacji, to należy przesunąć cały wielokąt (wszystkie jego
punkty) o taki sam wektor, o jaki został przesunięty punkt zaznaczony myszką.
