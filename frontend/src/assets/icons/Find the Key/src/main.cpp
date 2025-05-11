#include <raylib.h>
#include <iostream>
using namespace std;

void Movement(int(&heroPosition)[2], int &heroFace, int waterBoundary[], int landBoundary1[], int landBoundary2[], int landBoundary3[], int houseBoundary[]);
void GetKey(int heroPosition[], int keyPosition[], bool &isGetKey);
void DoorOpened(int heroPosition[], int houseBoundary[], bool isGetKey, bool &isOpenDoor);

int main(){

    int heroPosition[2] = {50, 100};
    int waterBoundary[4] = {0, 330, 260, 300};
    int landBoundary1[4] = {325, 0, 275, 430};
    int landBoundary2[4] = {600, 0, 365, 370};
    int landBoundary3[4] = {1020, 0, 180, 370};
    int houseBoundary[4] = {965, 0, 55, 120};
    int heroFace = 3;
    int keyPosition[2] = {830, 520};
    float autoGetIn = 440;
    bool isGetKey = false;
    bool isOpenDoor = false;
    
    InitWindow(1200, 630, "Find the Key - 2D Game");
    InitAudioDevice();
    Music Iris = LoadMusicStream("Audio/Iris.mp3");
    PlayMusicStream(Iris);
    
    Texture2D heroFacing;
    Texture2D backgroundChange;
    Texture2D background = LoadTexture("Images/background.png");
    Texture2D houseinside = LoadTexture("Images/background2.png");
    Texture2D heroFront = LoadTexture("Characters/hero_front.png");
    Texture2D heroBack = LoadTexture("Characters/hero_back.png");
    Texture2D heroLeft = LoadTexture("Characters/hero_left.png");
    Texture2D heroRight = LoadTexture("Characters/hero_right.png");
    Texture2D herokeyFront = LoadTexture("Characters/herokey_front.png");
    Texture2D herokeyLeft = LoadTexture("Characters/herokey_left.png");
    Texture2D herokeyRight = LoadTexture("Characters/herokey_right.png");
    Texture2D key = LoadTexture("Images/key.png");
    
    SetTargetFPS(60);

    while(!WindowShouldClose()){
        Movement(heroPosition, heroFace, waterBoundary, landBoundary1, landBoundary2, landBoundary3, houseBoundary);
        GetKey(heroPosition, keyPosition, isGetKey);
        DoorOpened(heroPosition, houseBoundary, isGetKey, isOpenDoor);
        
        if(isOpenDoor){
            UpdateMusicStream(Iris);
        }

        if(!isGetKey){
            switch(heroFace){
                case 0:
                    heroFacing = heroFront;
                    break;
                case 1:
                    heroFacing = heroBack;
                    break;
                case 2:
                    heroFacing = heroLeft;
                    break;
                case 3:
                    heroFacing = heroRight;
                    break;
            }
        }

        else{
            switch(heroFace){
                case 0:
                    heroFacing = herokeyFront;
                    break;
                case 1:
                    heroFacing = heroBack;
                    break;
                case 2:
                    heroFacing = herokeyLeft;
                    break;
                case 3:
                    heroFacing = herokeyRight;
                    break;
            }
        }

        if(!isOpenDoor){
            backgroundChange = background;
        }
        else{
            backgroundChange = houseinside;
        }

        BeginDrawing();
        ClearBackground(BLACK);
        DrawTexture(backgroundChange, 0, 0, WHITE);
        if(!isGetKey){
            DrawTexture(key, keyPosition[0], keyPosition[1], WHITE);
        }
        if(!isOpenDoor){
            DrawTexture(heroFacing, heroPosition[0], heroPosition[1], WHITE);
        }
        else{
            if(autoGetIn > 410){
                autoGetIn-=2;
            }
            DrawTexture(heroBack, 582, autoGetIn, WHITE);
        }
        EndDrawing();
    }
    UnloadTexture(background);
    UnloadTexture(houseinside);
    UnloadTexture(heroFront);
    UnloadTexture(heroBack);
    UnloadTexture(heroLeft);
    UnloadTexture(heroRight);
    UnloadTexture(key);
    UnloadMusicStream(Iris);
    CloseAudioDevice();
    CloseWindow();
    return 0;
}

void Movement(int(&heroPosition)[2], int &heroFace, int waterBoundary[], int landBoundary1[], int landBoundary2[], int landBoundary3[], int houseBoundary[]){ 

    Rectangle waterBorder = {(float)waterBoundary[0], (float)waterBoundary[1], (float)waterBoundary[2], (float)waterBoundary[3]};
    Rectangle landBorder1 = {(float)landBoundary1[0], (float)landBoundary1[1], (float)landBoundary1[2], (float)landBoundary1[3]};
    Rectangle landBorder2 = {(float)landBoundary2[0], (float)landBoundary2[1], (float)landBoundary2[2], (float)landBoundary2[3]};
    Rectangle landBorder3 = {(float)landBoundary3[0], (float)landBoundary3[1], (float)landBoundary3[2], (float)landBoundary3[3]};
    Rectangle houseBorder = {(float)houseBoundary[0], (float)houseBoundary[1], (float)houseBoundary[2], (float)houseBoundary[3]};
    Rectangle heroBox = {(float)heroPosition[0], (float)heroPosition[1], 40, 40};

    if(IsKeyDown(KEY_D)){
        heroBox.x += 4;
        if(!CheckCollisionRecs(waterBorder, heroBox) && !CheckCollisionRecs(landBorder1, heroBox) && !CheckCollisionRecs(landBorder2, heroBox) && !CheckCollisionRecs(landBorder3, heroBox) && !CheckCollisionRecs(houseBorder, heroBox) && heroPosition[0]+40 < 1200){
            heroPosition[0] += 4;
            heroFace = 3;
        }
    }
    if(IsKeyDown(KEY_A)){
        heroBox.x -= 4;
        if(!CheckCollisionRecs(waterBorder, heroBox) && !CheckCollisionRecs(landBorder1, heroBox) && !CheckCollisionRecs(landBorder2, heroBox) && !CheckCollisionRecs(landBorder3, heroBox) && !CheckCollisionRecs(houseBorder, heroBox) && heroPosition[0] > 0){
            heroPosition[0] -= 4;
            heroFace = 2;
        }
    }
    if(IsKeyDown(KEY_W)){
        heroBox.y -= 4;
        if(!CheckCollisionRecs(waterBorder, heroBox) && !CheckCollisionRecs(landBorder1, heroBox) && !CheckCollisionRecs(landBorder2, heroBox) && !CheckCollisionRecs(landBorder3, heroBox) && !CheckCollisionRecs(houseBorder, heroBox) && heroPosition[1] > 0){
            heroPosition[1] -= 4;
            heroFace = 1;
        }     
    }
    if(IsKeyDown(KEY_S)){
        heroBox.y += 4;
        if(!CheckCollisionRecs(waterBorder, heroBox) && !CheckCollisionRecs(landBorder1, heroBox) && !CheckCollisionRecs(landBorder2, heroBox) && !CheckCollisionRecs(landBorder3, heroBox) && !CheckCollisionRecs(houseBorder, heroBox) && heroPosition[1]+40 < 630){
            heroPosition[1] += 4;
            heroFace = 0;
        }
    }
}

void GetKey(int heroPosition[], int keyPosition[], bool &isGetKey){

    Rectangle keyBorder = {(float)keyPosition[0], (float)keyPosition[1], 40, 40};
    Rectangle heroBox = {(float)heroPosition[0], (float)heroPosition[1], 40, 40};

    if(CheckCollisionRecs(keyBorder, heroBox)){
        isGetKey = true;
    }
}

void DoorOpened(int heroPosition[], int houseBoundary[], bool isGetKey, bool &isOpenDoor){

    Rectangle houseBorder = {(float)houseBoundary[0], (float)houseBoundary[1], (float)houseBoundary[2], (float)houseBoundary[3]};
    Rectangle heroBox = {(float)heroPosition[0], (float)heroPosition[1], 40, 40};

    if(IsKeyDown(KEY_W)){
        heroBox.y-=1;
        if(CheckCollisionRecs(houseBorder, heroBox) && isGetKey){
            isOpenDoor = true;
        }
    }

}
