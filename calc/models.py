from django.db import models
from django.contrib.auth.models import User



class Macros(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='macros')
    meas_sys = models.BooleanField()#true for imperial false for metric
    weight = models.IntegerField()
    bfp = models.IntegerField()#body fat percentage
    act_lvl = models.FloatField()
    goal = models.BooleanField()#true for fat loss false for muscle gain
    active = models.BooleanField(default=True)

    lbm = models.IntegerField()
    bmr = models.IntegerField()
    
    protein = models.IntegerField()

    train_kcal = models.IntegerField()
    train_fat = models.IntegerField()
    train_carb = models.IntegerField()
    
    rest_kcal = models.IntegerField()
    rest_fat = models.IntegerField()
    rest_carb = models.IntegerField()

    #NEW
    tdee = models.IntegerField()
    tadci = models.IntegerField()
    tdci = models.IntegerField()
    rdci = models.IntegerField()


    def faq_dict(self):
        faq_dict = {
            'lbm': self.lbm,
            'bmr': self.bmr,
            'act_lvl': self.act_lvl,
            'goal': self.goal,

            'tdee': self.tdee,
            'tadci': self.tadci,
            'tdci': self.tdci,
            'rdci': self.rdci,
        }
        return faq_dict
    
    def macros_dict(self):
        macros_dict = {
            'train_kcal': self.train_kcal,
            'train_fat': self.train_fat,
            'train_carb': self.train_carb,
            'rest_kcal': self.rest_kcal,
            'rest_fat': self.rest_fat,
            'rest_carb': self.rest_carb,
            'protein': self.protein,
        }
        return macros_dict

    def __str__(self):
        return f"Training Day({self.train_kcal}/{self.train_fat}/{self.train_carb}/{self.protein}); Rest Day({self.rest_kcal}/{self.rest_fat}/{self.rest_carb}/{self.protein}); User: {self.user}; Active: {self.active}"